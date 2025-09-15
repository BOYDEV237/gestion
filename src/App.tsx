import React from 'react';
import { Building2 } from 'lucide-react';
import { useAuth } from './hooks/useAuth';
import { useLanguage } from './hooks/useLanguage';
import AnimatedBackground from './components/AnimatedBackground';
import LanguageSwitcher from './components/LanguageSwitcher';
import LoginForm from './components/LoginForm';
import UnifiedSelector from './components/UnifiedSelector';
import DivisionDetail from './components/DivisionDetail';
import GFCDepartmentDetail from './components/GFCDepartmentDetail';
import FFIDepartmentDetail from './components/FFIDepartmentDetail';
import VGIDepartmentDetail from './components/VGIDepartmentDetail';
import Dashboard from './components/Dashboard';
import OfficeDashboard from './components/OfficeDashboard';
import { COMPANY_INFO } from './constants';

function App() {
  const { user, loading, login, selectDepartment, selectDivision, selectOffice, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showDepartmentDetail, setShowDepartmentDetail] = React.useState<string | null>(null);
  const [showDivisionDetail, setShowDivisionDetail] = React.useState<string | null>(null);
  const [selectedOffice, setSelectedOffice] = React.useState<string | null>(null);

  const handleLogin = async (credentials: any) => {
    await login(credentials);
  };


  const handleOfficeSelect = (officeId: string) => {
    setSelectedOffice(officeId);
    setShowDivisionDetail(null); // Close division detail when selecting office
    selectOffice(officeId);
  };

  const handleDepartmentSelect = (department: any) => {
    selectDepartment(department);
  };

  // Show department detail if requested
  if (showDepartmentDetail) {
    switch (showDepartmentDetail) {
      case 'land-cadastral':
        return (
          <GFCDepartmentDetail
            onBack={() => setShowDepartmentDetail(null)}
            language={language}
            setLanguage={setLanguage}
          />
        );
      case 'financing':
        return (
          <FFIDepartmentDetail
            onBack={() => setShowDepartmentDetail(null)}
            language={language}
            setLanguage={setLanguage}
          />
        );
      case 'sales-management':
        return (
          <VGIDepartmentDetail
            onBack={() => setShowDepartmentDetail(null)}
            language={language}
            setLanguage={setLanguage}
          />
        );
      default:
        return (
          <GFCDepartmentDetail
            onBack={() => setShowDepartmentDetail(null)}
            language={language}
            setLanguage={setLanguage}
          />
        );
    }
  }

  // Show division detail if requested
  if (showDivisionDetail) {
    return (
      <DivisionDetail
        divisionId={showDivisionDetail}
        user={user!}
        onBack={() => setShowDivisionDetail(null)}
        onSelectOffice={handleOfficeSelect}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  // Show office dashboard if office is selected
  if (selectedOffice && user) {
    return (
      <OfficeDashboard
        user={user}
        officeId={selectedOffice}
        onBack={() => setSelectedOffice(null)}
        onLogout={logout}
        language={language}
      />
    );
  }
  // Show dashboard if user is logged in and has selected a department
  if (user && user.currentDepartment) {
    return (
      <Dashboard
        user={user}
        department={user.currentDepartment}
        division={user.currentDivision!}
        onLogout={logout}
        t={t}
        language={language}
      />
    );
  }

  // Show unified selector if user is logged in but hasn't selected department/division
  if (user) {
    return (
      <UnifiedSelector
        user={user}
        departments={user.departments}
        divisions={user.divisions}
        onSelectDepartment={handleDepartmentSelect}
        onSelectDivision={selectDivision}
        onShowDepartmentDetail={setShowDepartmentDetail}
        onShowDivisionDetail={setShowDivisionDetail}
        onLogout={logout}
        t={t}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  // Show login page
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      <AnimatedBackground />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
      </div>
      
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen py-8">
          
          {/* Left Side - Company Info & Logo */}
          <div className="text-center lg:text-left space-y-8">
            {/* Company Logo */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
              
                   <img
                      src="/logo.png"
                      alt="Premium Afro Kinky Bulk Hair LOGO"
                      className="w-32 h-32 mr-2"
                    />
                  
              
                {/* Animated rings around logo */}
                <div className="absolute inset-0 rounded-3xl border-2 border-blue-400 animate-ping opacity-30"></div>
                <div className="absolute inset-0 rounded-3xl border-2 border-orange-400 animate-ping opacity-20" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            
            {/* Company Title */}
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  GeoCasa
                </span>
                <br />
                <span className="text-gray-200 text-4xl lg:text-5xl">Group</span>
              </h1>
              
             
              
              <p className="text-xl lg:text-2xl text-blue-100 font-light leading-relaxed">
                {language === 'en' ? 'Department Management System' : 'Système de gestion des départements'}
              </p>
              
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto lg:mx-0"></div>
            </div>
            
            {/* Company Description */}
            <div className="space-y-6 text-blue-100">
              <p className="text-lg leading-relaxed">
                {language === 'en' 
                  ? 'Integrated platform for efficient management of your real estate and land departments.' 
                  : 'Plateforme intégrée pour la gestion efficace de vos départements immobiliers et fonciers.'}
              </p>
               {/* Nos Services */}
              <div className="mb-6">
                <h2 className="text-2xl lg:text-3xl font-semibold text-blue-100 mb-4">
                  {language === 'en' ? 'Our Services' : 'Nos Services'}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div 
                  onClick={() => setShowDepartmentDetail('land-cadastral')}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20 cursor-pointer hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-semibold">{language === 'en' ? 'Land Management' : 'Gestion Foncière'}</p>
                </div>
                
                <div 
                  onClick={() => setShowDepartmentDetail('financing')}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20 cursor-pointer hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-semibold">{language === 'en' ? 'Financing' : 'Financement'}</p>
                </div>
                
                <div 
                  onClick={() => setShowDepartmentDetail('sales-management')}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 border border-white border-opacity-20 cursor-pointer hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="w-8 h-8 bg-gray-500 rounded-lg flex items-center justify-center mb-2 mx-auto">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="font-semibold">{language === 'en' ? 'Sales & Management' : 'Vente & Gestion'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Curved Login Container */}
              <div className="relative">
                {/* Background Shape */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[3rem] transform rotate-1 scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 to-orange-500/20 backdrop-blur-xl rounded-[3rem] transform -rotate-1"></div>
                
                {/* Main Login Form */}
                <div className="relative bg-white/15 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/30 shadow-2xl">
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">
                      {t('welcome')}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {language === 'en' ? 'Login - GeoCasa Group' : 'Connexion - GeoCasa Group'}
                    </p>
                    <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto mt-3"></div>
                  </div>
                  
                  {/* Login Form */}
                  <LoginForm
                    onLogin={handleLogin}
                    loading={loading}
                    t={t}
                  />
                  
                  {/* Security Badge */}
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-white font-medium">
                        {language === 'en' ? 'Secure Connection' : 'Connexion sécurisée'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8 text-blue-100 text-sm lg:absolute lg:bottom-8 lg:left-1/2 lg:transform lg:-translate-x-1/2">
          <p>{language === 'en' ? 'Yaoundé, Cameroon' : COMPANY_INFO.location}</p>
          <p>
            {language === 'en' ? 'Business Hours: 08:00 - 18:00' : 'Heures d\'ouverture: 08:00 - 18:00'} • {COMPANY_INFO.phone} • {COMPANY_INFO.email}
          </p>
          <p className="mt-2 text-xs">
            {language === 'en' ? '24/7 Customer Support' : 'Support Client 24/7'}
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default App;