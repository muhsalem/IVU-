import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { calculateIvuContractValue, DEFAULT_BASKET_COMPONENTS } from './src/utils/ivuMath';
import { HISTORICAL_BACKTEST_DATA, BACKTEST_METRICS } from './src/data/historicalData';
import { VALUE_MODELS_COMPARISON } from './src/data/comparisonData';
import { SHARIAH_RULINGS, MAQASID_PRINCIPLES } from './src/data/shariahData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client lazily on demand
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!aiClient) {
      const key = process.env.GEMINI_API_KEY;
      if (key) {
        aiClient = new GoogleGenAI({
          apiKey: key,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });
      }
    }
    return aiClient;
  }

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Islamic Value Unit (IVU) API Node', version: '1.0.0' });
  });

  // Calculate IVU Contract Settlement Value
  app.post('/api/ivu/calculate', (req, res) => {
    try {
      const { startDateYear, endDateYear, nominalAmount, currencyCode, contractType, customWeights } = req.body;
      const result = calculateIvuContractValue({
        startDateYear: Number(startDateYear) || 2010,
        endDateYear: Number(endDateYear) || 2026,
        nominalAmount: Number(nominalAmount) || 100000,
        currencyCode: currencyCode || 'USD',
        contractType: contractType || 'qard_hasan',
        customWeights
      });
      res.json({ success: true, result });
    } catch (err: any) {
      res.status(400).json({ success: false, error: err.message || 'Error calculating IVU valuation' });
    }
  });

  // Get Historical Backtest & Indices
  app.get('/api/ivu/historical', (req, res) => {
    res.json({
      success: true,
      historicalData: HISTORICAL_BACKTEST_DATA,
      metrics: BACKTEST_METRICS
    });
  });

  // Get IVU Basket Breakdown
  app.get('/api/ivu/basket', (req, res) => {
    res.json({
      success: true,
      basket: DEFAULT_BASKET_COMPONENTS
    });
  });

  // Get Value Models Comparison Matrix
  app.get('/api/ivu/comparison-matrix', (req, res) => {
    res.json({
      success: true,
      models: VALUE_MODELS_COMPARISON
    });
  });

  // Gemini AI Shariah & Macroeconomic Expert Consultation API
  app.post('/api/gemini/advisor', async (req, res) => {
    try {
      const { question, contextData } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        // Return structured Fallback answer if no key is present
        return res.json({
          success: true,
          answer: `[إجابة الخبير الآلي الشرعي والاقتصادي]: بناءً على المعايير الشرعية رقم (1) ورقم (3) ورقم (19) الصادرة عن هيئة AAOIFI وقرار مجمع الفقه الإسلامي الدولي رقم 115، ينبغي في العقود الممتدة والديون المؤجلة الحفاظ على القوة الشرائية الحقيقية للعقد دون اشتراط فائدة مشروطة، وتعتبر وحدة القيمة الإسلامية (IVU) المعيار الأعدل والأكثر توافقاً لحفظ القسط بين الدائن والمدين.`
        });
      }

      const prompt = `
أنت مستشار شرعي واقتصادي خبير في منظومة "وحدة القيمة الإسلامية (IVU)".
سؤال المستخدم: "${question}"
سياق البيانات إن وجد: ${JSON.stringify(contextData || {})}

قواعد الإجابة:
1. أجب باللغة العربية بأسلوب علمي، متزن، مستند إلى المعايير الشرعية لمؤسسة AAOIFI وقرارات مجمع الفقه الإسلامي الدولي ومقاصد الشريعة (حفظ المال وتحقيق العدل).
2. وضح الموقف الاقتصادي والشرعي بوضوح واذكر الحجة والتعليل.
3. بَيّن كيف تحقق وحدة IVU العدالة والتحوط دون الوقوع في الربا أو الغرر.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt
      });

      res.json({
        success: true,
        answer: response.text || 'تم تقديم الإجابة الشرعية والاقتصادية بنجاح.'
      });
    } catch (error: any) {
      console.error('Gemini Advisor Error:', error);
      res.status(500).json({
        success: false,
        error: 'حدث خطأ أثناء استشارة الخبير الآلي. يرجى المحاولة لاحقاً.'
      });
    }
  });

  // Serve Vite Dev Server in Development or Static dist in Production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Islamic Value Unit (IVU) Server running on http://localhost:${PORT}`);
  });
}

startServer();
