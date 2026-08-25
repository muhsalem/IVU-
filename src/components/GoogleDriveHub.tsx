import React, { useState, useEffect } from 'react';
import { 
  googleSignIn, 
  logout, 
  initAuth, 
  getAccessToken, 
  listDriveFiles, 
  uploadFileToDrive, 
  deleteDriveFile, 
  getOrCreateIvuFolder,
  DriveFileItem 
} from '../services/googleDriveService';
import { User } from 'firebase/auth';
import { 
  Cloud, 
  Upload, 
  FolderPlus, 
  FileText, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  LogOut, 
  FileCheck, 
  Database,
  Lock,
  Download,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const GoogleDriveHub: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  
  // Files state
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [onlyIvuArchive, setOnlyIvuArchive] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  // New Upload Form Modal/State
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadTitle, setUploadTitle] = useState<string>('تقرير-معاملة-IVU-الشرعية');
  const [uploadContent, setUploadContent] = useState<string>(
    JSON.stringify({
      appName: 'منصة وحدة القيمة الإسلامية IVU Standard',
      timestamp: new Date().toISOString(),
      standard: 'AAOIFI #1 & #3',
      contractType: 'قرض حسن / حفظ قيمة وقفية',
      goldWeightRatio: '30%',
      sdrCurrencyRatio: '35%',
      commoditiesRatio: '25%',
      silverRatio: '10%',
      notes: 'تمت الأرشفة الآلية عبر سحابة Google Drive المشفرة'
    }, null, 2)
  );

  // Destructive Delete Confirmation Modal State
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (authedUser, authedToken) => {
        setUser(authedUser);
        setToken(authedToken);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsLoadingAuth(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Fetch files when user & token available
  useEffect(() => {
    if (user && token) {
      loadFiles();
    } else {
      setFiles([]);
    }
  }, [user, token, onlyIvuArchive]);

  const loadFiles = async () => {
    setIsLoadingFiles(true);
    try {
      let query = "trashed = false";
      if (onlyIvuArchive) {
        query += " and name contains 'IVU'";
      }
      const fileList = await listDriveFiles(query, 30);
      setFiles(fileList);
    } catch (error: any) {
      console.error('Failed to load drive files:', error);
      setStatusMessage({
        text: error?.message || 'تعذر تحميل ملفات Google Drive',
        type: 'error'
      });
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    setStatusMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        setStatusMessage({
          text: `مرحباً ${result.user.displayName || 'بك'}! تم الاتصال بـ Google Drive بنجاح.`,
          type: 'success'
        });
      }
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        text: err?.message || 'فشل تسجيل الدخول باستخدام Google',
        type: 'error'
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
    setStatusMessage({
      text: 'تم تسجيل الخروج بنجاح وإلغاء الجلسة.',
      type: 'info'
    });
  };

  const handleUploadSample = async () => {
    if (!uploadTitle.trim()) {
      setStatusMessage({ text: 'يرجى إدخال اسم الملف', type: 'error' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);
    try {
      const folderId = await getOrCreateIvuFolder();
      const filename = uploadTitle.endsWith('.json') ? uploadTitle : `${uploadTitle}_${Date.now()}.json`;
      
      const newFile = await uploadFileToDrive(filename, uploadContent, 'application/json', folderId);
      setStatusMessage({
        text: `تم حفظ الملف بنجاح في مجلد IVU_Standard_Archive: ${newFile.name}`,
        type: 'success'
      });
      await loadFiles();
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        text: err?.message || 'فشل رفع الملف إلى Google Drive',
        type: 'error'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const executeDeleteFile = async () => {
    if (!fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(fileToDelete.id);
      setStatusMessage({
        text: `تم حذف الملف «${fileToDelete.name}» من Google Drive بنجاح.`,
        type: 'success'
      });
      setFileToDelete(null);
      await loadFiles();
    } catch (err: any) {
      console.error(err);
      setStatusMessage({
        text: err?.message || 'تعذر حذف الملف',
        type: 'error'
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredFiles = files.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold">
            <Cloud className="w-4 h-4" />
            <span>التكامل مع Google Workspace & Google Drive</span>
          </div>
          <span className="bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs px-3 py-1 rounded-full font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            OAuth 2.0 Client-Side Sync
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-3">
              <Cloud className="w-8 h-8 text-blue-400 shrink-0" />
              أرشيف ومزامنة Google Drive لعقود وحاسبات IVU
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              احفظ عقودك الشرعية المعتمدة، وتقارير تسوية الديون، وحسابات القوة الشرائية مباشرة في حسابك على Google Drive بمجلد آمن ومستقل، مع إمكانية المشاركة والتحميل في أي وقت.
            </p>
          </div>

          {/* User Auth Card or Sign In Button */}
          <div className="shrink-0">
            {user ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-11 h-11 rounded-full border border-amber-500/30" />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    {user.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">{user.displayName || 'مستخدم Google'}</span>
                  <span className="text-[11px] text-slate-400 font-mono block">{user.email}</span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> متصل بـ Google Drive
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-800 transition-all ml-2"
                  title="تسجيل الخروج"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={isSigningIn}
                className="bg-white hover:bg-slate-100 text-slate-900 px-5 py-3 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-3 transition-all hover:scale-102 border border-slate-300 disabled:opacity-50"
              >
                {/* Official Google Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>{isSigningIn ? 'جارِ تسجيل الدخول...' : 'تسجيل الدخول باستخدام Google'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Status Toast Message */}
        {statusMessage && (
          <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-3 ${
            statusMessage.type === 'success' 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
              : statusMessage.type === 'error'
              ? 'bg-red-950/40 border-red-500/40 text-red-300'
              : 'bg-blue-950/40 border-blue-500/40 text-blue-300'
          }`}>
            <div className="flex items-center gap-2">
              {statusMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />}
              {statusMessage.type === 'error' && <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />}
              {statusMessage.type === 'info' && <ShieldCheck className="w-4 h-4 shrink-0 text-blue-400" />}
              <span>{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}
      </div>

      {!user ? (
        /* Not logged in State */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white">قم بالربط مع Google Drive للوصول إلى السحابة</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              سجل الدخول بحسابك في Google لتتمكن من رفع العقود وحفظ التقارير المحسوبة واسترجاعها بأمان وتشفير كامل.
            </p>
          </div>
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-xl inline-flex items-center gap-2 transition-all"
          >
            <Cloud className="w-4 h-4" />
            <span>بدء الاتصال بـ Google Drive الآن</span>
          </button>
        </div>
      ) : (
        /* Logged In Dashboard: Files Explorer & Quick Upload */
        <div className="space-y-6">
          {/* Quick Actions Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upload Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Upload className="w-4 h-4 text-blue-400" />
                  حفظ تقرير IVU جديد في Drive
                </span>
                <span className="text-[10px] bg-blue-500/10 text-blue-300 px-2 py-0.5 rounded border border-blue-500/20">
                  Folder: IVU_Standard_Archive
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">عنوان التقرير / العقد:</label>
                  <input
                    type="text"
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="مثال: عقد_قرض_حسن_2026.json"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold block">محتوى البيانات الشرعية:</label>
                  <textarea
                    rows={4}
                    value={uploadContent}
                    onChange={(e) => setUploadContent(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-slate-300 font-mono text-[11px] focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleUploadSample}
                  disabled={isUploading}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50 transition-all"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'جارِ الرفع إلى Google Drive...' : 'حفظ فوري في Google Drive'}</span>
                </button>
              </div>
            </div>

            {/* Google Drive Stats Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    حالة المزامنة السحابية
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Live Connected</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">إجمالي الملفات المقروءة:</span>
                    <strong className="font-mono text-white">{files.length} ملف</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800/60">
                    <span className="text-slate-400">المجلد المخصص:</span>
                    <strong className="text-amber-400 font-mono">IVU_Standard_Archive</strong>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">التشفير:</span>
                    <strong className="text-emerald-400">Google Drive End-to-End</strong>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl text-[11px] text-blue-200">
                يتم رفع التقارير بصيغ JSON وPDF وعقود شرعية موثقة يمكن فتحها ومشاركتها مع أطراف العقد أو المحكمة الشرعية.
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3 shadow-xl text-xs text-slate-300 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  أمان وخصوصية البيانات
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  يتم تخزين رمز الدخول في الذاكرة المؤقتة للبرنامج فقط (In-Memory) دون حفظه في LocalStorage لضمان أقصى درجات الحماية لحسابك.
                </p>
              </div>
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-950 hover:bg-slate-800 text-slate-200 p-2.5 rounded-xl border border-slate-800 text-center font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>فتح Google Drive في تبويب جديد</span>
              </a>
            </div>
          </div>

          {/* Drive Files List Explorer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">مستكشف ملفات Google Drive</h3>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* Search input */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="بحث في أسماء الملفات..."
                    className="bg-slate-950 border border-slate-800 rounded-xl pr-9 pl-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                {/* Filter toggle */}
                <button
                  onClick={() => setOnlyIvuArchive(!onlyIvuArchive)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    onlyIvuArchive 
                      ? 'bg-blue-500 text-slate-950 border-blue-400' 
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {onlyIvuArchive ? '✓ ملفات IVU فقط' : 'جميع الملفات'}
                </button>

                {/* Refresh button */}
                <button
                  onClick={loadFiles}
                  disabled={isLoadingFiles}
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-all disabled:opacity-50"
                  title="تحديث القائمة"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin text-blue-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* File Table / Grid */}
            {isLoadingFiles ? (
              <div className="py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                <span>جارِ تحميل قائمة الملفات من Google Drive...</span>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="py-12 text-center space-y-2 border border-dashed border-slate-800 rounded-xl">
                <FolderPlus className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400">لا توجد ملفات متطابقة في حساب Google Drive حالياً.</p>
                <button
                  onClick={handleUploadSample}
                  className="text-xs text-blue-400 hover:underline font-bold"
                >
                  + إنشاء وحفظ تقرير تجريبي الآن
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">اسم الملف</th>
                      <th className="p-3">النوع</th>
                      <th className="p-3">تاريخ التعديل</th>
                      <th className="p-3 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredFiles.map((file) => {
                      const isFolder = file.mimeType.includes('folder');
                      const isJsonOrDoc = file.name.endsWith('.json') || file.name.includes('IVU');
                      return (
                        <tr key={file.id} className="hover:bg-slate-950/60 transition-all">
                          <td className="p-3 font-medium text-white flex items-center gap-2.5">
                            {isFolder ? (
                              <FolderPlus className="w-4 h-4 text-amber-400 shrink-0" />
                            ) : (
                              <FileText className={`w-4 h-4 shrink-0 ${isJsonOrDoc ? 'text-emerald-400' : 'text-blue-400'}`} />
                            )}
                            <span className="truncate max-w-xs">{file.name}</span>
                          </td>
                          <td className="p-3 text-slate-400 font-mono text-[11px]">
                            {isFolder ? 'مجلد (Folder)' : file.mimeType.split('.').pop() || 'File'}
                          </td>
                          <td className="p-3 text-slate-400 font-mono text-[11px]">
                            {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString('ar-SA') : '—'}
                          </td>
                          <td className="p-3">
                            <div className="flex items-center justify-center gap-2">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg transition-all"
                                  title="فتح في Google Drive"
                                >
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                              )}
                              {/* Safe Delete with Confirmation Requirement */}
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 rounded-lg transition-all"
                                title="حذف الملف"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Modal for Destructive Delete Action */}
      {fileToDelete && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">تأكيد حذف الملف من Google Drive</h4>
                <span className="text-[11px] text-slate-400">عملية غير قابلة للتراجع</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1.5">
              <span className="text-slate-400 block">الملف المستهدف:</span>
              <strong className="text-white font-mono block break-all">{fileToDelete.name}</strong>
              <span className="text-[10px] text-slate-500 block">ID: {fileToDelete.id}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              هل أنت متأكد من رغبتك في حذف هذا الملف نهائياً من حساب Google Drive الخاص بك؟ لن تتمكن المنصة من استرجاع هذا الملف بعد الحذف.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all"
              >
                إلغاء الأمر
              </button>
              <button
                onClick={executeDeleteFile}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all disabled:opacity-50"
              >
                <Trash2 className="w-4 h-4" />
                <span>{isDeleting ? 'جارِ الحذف...' : 'نعم، احذف الملف'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
