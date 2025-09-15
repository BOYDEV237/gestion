import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Award, 
  Briefcase,
  Building, 
  Calendar,
  Clock,
  Eye,
  Mail,
  MapPin,
  Phone,
  Star,
  User as UserIcon,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Department, Division, User, Office } from '../types';
import AnimatedBackground from './AnimatedBackground';
import LanguageSwitcher from './LanguageSwitcher';

interface UnifiedSelectorProps {
  user: User;
  departments: Department[];
  divisions: Division[];
  onSelectDepartment: (department: Department) => void;
  onSelectDivision: (division: Division) => void;
  onSelectOffice: (office: Office) => void;
  onShowDepartmentDetail: (departmentId: string) => void;
  onShowDivisionDetail: (divisionId: string) => void;
  onLogout: () => void;
  t: (key: string) => string;
  language: string;
  setLanguage: (lang: string) => void;
}

const UnifiedSelector: React.FC<UnifiedSelectorProps> = ({ 
  user,
  departments, 
  divisions,
  onSelectDepartment,
  onSelectDivision,
  onSelectOffice,
  onShowDepartmentDetail,
  onShowDivisionDetail,
  onLogout,
  t,
  language,
  setLanguage
}) => {
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDivisionPage, setCurrentDivisionPage] = useState(1);
  const [currentOfficePage, setCurrentOfficePage] = useState(1);
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
  const [showDivisionOffices, setShowDivisionOffices] = useState(false);
  const divisionsPerPage = 1;
  const officesPerPage = 5;

  // Update time every second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  };

  // Complete icon mapping for departments
  const iconMap = {
    Building: Building,
    Users: Users,
    Award: Award,
    Star: Star,
    // Add fallbacks for any other possible icons
    ArrowRight: ArrowRight,
    Briefcase: Briefcase,
    Eye: Eye,
  };

  // Division pagination
  const indexOfLastDivision = currentDivisionPage * divisionsPerPage;
  const indexOfFirstDivision = indexOfLastDivision - divisionsPerPage;
  const currentDivisions = divisions.slice(indexOfFirstDivision, indexOfLastDivision);
  const totalDivisionPages = Math.ceil(divisions.length / divisionsPerPage);

  const nextDivisionPage = () => {
    if (currentDivisionPage < totalDivisionPages) {
      setCurrentDivisionPage(currentDivisionPage + 1);
    }
  };

  const prevDivisionPage = () => {
    if (currentDivisionPage > 1) {
      setCurrentDivisionPage(currentDivisionPage - 1);
    }
  };

  // Office pagination
  const indexOfLastOffice = currentOfficePage * officesPerPage;
  const indexOfFirstOffice = indexOfLastOffice - officesPerPage;
  const currentOffices = selectedDivision 
    ? selectedDivision.offices.slice(indexOfFirstOffice, indexOfLastOffice) 
    : [];
  const totalOfficePages = selectedDivision 
    ? Math.ceil(selectedDivision.offices.length / officesPerPage) 
    : 0;

  const nextOfficePage = () => {
    if (currentOfficePage < totalOfficePages) {
      setCurrentOfficePage(currentOfficePage + 1);
    }
  };

  const prevOfficePage = () => {
    if (currentOfficePage > 1) {
      setCurrentOfficePage(currentOfficePage - 1);
    }
  };

  const handleShowDivisionOffices = (division: Division) => {
    setSelectedDivision(division);
    setShowDivisionOffices(true);
    setCurrentOfficePage(1);
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Language Switcher and Logout - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center space-x-4">
          {/* Time and Date Display */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-white animate-pulse" />
                <div className="text-center">
                  <div className="text-lg font-bold text-white font-mono">
                    {formatTime(currentTime)}
                  </div>
                  <div className="text-xs text-white/80">Heure</div>
                </div>
              </div>
              
              <div className="w-px h-8 bg-white/30"></div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-white" />
                <div className="text-center">
                  <div className="text-sm font-semibold text-white capitalize">
                    {formatDate(currentTime)}
                  </div>
                  <div className="text-xs text-white/80">Date</div>
                </div>
              </div>
            </div>
          </div>
          
          <LanguageSwitcher language={language as any} onLanguageChange={setLanguage as any} />
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 bg-red-900 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-red-400/30 hover:bg-red-500 transition-all duration-300"
          >
            <span className="text-sm font-medium">
              {language === 'en' ? 'Logout' : 'Déconnexion'}
            </span>
          </button>
        </div>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* User Profile Section */}
          <div className="mb-12 mt-24">
            <div className="bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/30 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <img
                      src="/default.png"
                      alt={user.name}
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-white/30 shadow-xl"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300';
                      }}
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* User Information */}
                <div className="flex-1 text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{user.name}</h1>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0 text-blue-100 mb-4">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{departments.length} Département(s)</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{divisions.length} Division(s)</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-6">
                    {departments.slice(0, 2).map((dept) => (
                      <span key={dept.id} className="px-3 py-1 bg-blue-500/30 text-blue-100 rounded-full text-sm border border-blue-400/30">
                        {dept.nameFr}
                      </span>
                    ))}
                    {departments.length > 2 && (
                      <span className="px-3 py-1 bg-gray-500/30 text-gray-100 rounded-full text-sm border border-gray-400/30">
                        +{departments.length - 2} autres
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setShowUserDetails(true)}
                    className="bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to--700 text-white font-bold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center space-x-2 mx-auto lg:mx-0 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Voir toutes les informations</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Departments Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                  Départements
                </span>
              </h2>
              <p className="text-blue-100 text-xl">
                {language === 'en' ? 'Choose your department' : 'Choisissez votre département'}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((department, index) => {
                // Safely get the icon component with a fallback
                const IconComponent = iconMap[department.icon as keyof typeof iconMap] || Building;
                
                return (
                  <div
                    key={department.id}
                    className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div 
                      onClick={() => onSelectDepartment(department)}
                      className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 hover:border-opacity-40 transition-all duration-300 shadow-2xl"
                    >
                      <div className="flex flex-col items-center text-center space-y-6">
                        {/* Department Icon */}
                        <div className={`w-20 h-20 ${department.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-10 h-10 text-white" />
                        </div>
                        
                        {/* Department Name */}
                        <div>
                          <h3 className="text-xl font-bold text-white leading-tight mb-2">
                            {language === 'en' ? department.nameEn : department.nameFr}
                          </h3>
                          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto"></div>
                        </div>
                        
                        {/* Access Button */}
                        <div className="flex items-center justify-center space-x-2 text-blue-200 group-hover:text-white transition-colors duration-300">
                          <span className="text-sm font-semibold">
                            {language === 'en' ? 'Access Department' : 'Accéder au département'}
                          </span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Divisions Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-orange-900 bg-clip-text text-transparent">
                  Divisions
                </span>
              </h2>
              <p className="text-blue-100 text-xl">
                {language === 'en' ? 'Choose your division' : 'Choisissez votre division'}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto mt-4"></div>
            </div>

            {/* Division Pagination Controls */}
            {divisions.length > 0 && (
              <div className="flex justify-center items-center mb-8 space-x-4">
                <button
                  onClick={prevDivisionPage}
                  disabled={currentDivisionPage === 1}
                  className={`p-3 rounded-full ${currentDivisionPage === 1 
                    ? 'bg-gray-400/30 cursor-not-allowed' 
                    : 'bg-white/10 hover:bg-white/20'} transition-colors`}
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                <span className="text-white font-medium text-lg">
                  {currentDivisionPage} / {totalDivisionPages}
                </span>
                
                <button
                  onClick={nextDivisionPage}
                  disabled={currentDivisionPage === totalDivisionPages}
                  className={`p-3 rounded-full ${currentDivisionPage === totalDivisionPages 
                    ? 'bg-gray-400/30 cursor-not-allowed' 
                    : 'bg-white/10 hover:bg-white/20'} transition-colors`}
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </div>
            )}

            <div className="space-y-12">
              {currentDivisions.map((division, index) => {
                // For the first division (index 0): Description on left, picture on right
                // For the second division (index 1): Picture on left, description on right
                // And so on alternating...
                const isEvenIndex = index % 2 === 0;
                
                return (
                  <div
                    key={division.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center animate-fadeIn"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    {/* For even indices (0, 2, 4...): Description first, then picture */}
                    {isEvenIndex ? (
                      <>
                        {/* Division Information (Left side) */}
                        <div className="text-white space-y-6">
                          <div>
                            <div className={`w-12 h-12 ${division.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                              <Building className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                                {language === 'en' ? division.nameEn : division.nameFr}
                              </span>
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full mb-6"></div>
                            <p className="text-xl text-blue-100 leading-relaxed mb-6">
                              {language === 'en' ? division.descriptionEn : division.description}
                            </p>
                            <div className="text-sm text-blue-200 mb-6">
                              <span className="font-semibold">{division.offices.length} bureaux spécialisés</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={() => onSelectDivision(division)}
                              className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                              <span className="text-lg">Sélectionner Division</span>
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                            <button
                              onClick={() => handleShowDivisionOffices(division)}
                              className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50"
                            >
                              <Eye className="w-5 h-5" />
                              <span>Voir bureaux</span>
                            </button>
                          </div>
                        </div>

                        {/* Division Image (Right side) */}
                        <div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[3rem] transform rotate-2 scale-105"></div>
                            <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/30 shadow-2xl">
                              <img
                                src={division.image}
                                alt={language === 'en' ? division.nameEn : division.nameFr}
                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Division+Image';
                                }}
                              />
                              
                              {/* Stats Overlay */}
                              <div className="absolute bottom-2 left-2 right-2">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3">
                                  <div className="grid grid-cols-3 gap-3 text-center">
                                    <div>
                                      <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">15+</div>
                                      <div className="text-xs text-gray-600">Personnel</div>
                                    </div>
                                    <div>
                                      <Award className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">8+</div>
                                      <div className="text-xs text-gray-600">Années</div>
                                    </div>
                                    <div>
                                      <Star className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">95%</div>
                                      <div className="text-xs text-gray-600">Efficacité</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* For odd indices (1, 3, 5...): Picture first, then description */
                      <>
                        {/* Division Image (Left side) */}
                        <div>
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-[3rem] transform rotate-2 scale-105"></div>
                            <div className="relative bg-white/10 backdrop-blur-2xl rounded-[3rem] p-6 border border-white/30 shadow-2xl">
                              <img
                                src={division.image}
                                alt={language === 'en' ? division.nameEn : division.nameFr}
                                className="w-full h-64 object-cover rounded-2xl shadow-lg"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Division+Image';
                                }}
                              />
                              
                              {/* Stats Overlay */}
                              <div className="absolute bottom-2 left-2 right-2">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3">
                                  <div className="grid grid-cols-3 gap-3 text-center">
                                    <div>
                                      <Users className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">15+</div>
                                      <div className="text-xs text-gray-600">Personnel</div>
                                    </div>
                                    <div>
                                      <Award className="w-4 h-4 text-pink-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">8+</div>
                                      <div className="text-xs text-gray-600">Années</div>
                                    </div>
                                    <div>
                                      <Star className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                                      <div className="text-lg font-bold text-gray-900">95%</div>
                                      <div className="text-xs text-gray-600">Efficacité</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Division Information (Right side) */}
                        <div className="text-white space-y-6">
                          <div>
                            <div className={`w-12 h-12 ${division.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}>
                              <Building className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                              <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                                {language === 'en' ? division.nameEn : division.nameFr}
                              </span>
                            </h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full mb-6"></div>
                            <p className="text-xl text-blue-100 leading-relaxed mb-6">
                              {language === 'en' ? division.descriptionEn : division.description}
                            </p>
                            <div className="text-sm text-blue-200 mb-6">
                              <span className="font-semibold">{division.offices.length} bureaux spécialisés</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex flex-col sm:flex-row gap-4">
                            <button
                              onClick={() => onSelectDivision(division)}
                              className="bg-gradient-to-r from-orange-500 to-blue-900 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
                            >
                              <span className="text-lg">Sélectionner Division</span>
                              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                            </button>
                            <button
                              onClick={() => handleShowDivisionOffices(division)}
                              className="bg-white/10 hover:bg-white/20 text-white font-medium py-4 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 border border-white/30 hover:border-white/50"
                            >
                              <Eye className="w-5 h-5" />
                              <span>Voir bureaux</span>
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Information */}
          <div className="text-center mt-16 text-blue-100 text-sm space-y-3">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Gestion Intégrée</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Excellence Professionnelle</span>
              </div>
            </div>
            <p className="font-medium">Yaoundé, Cameroun</p>
            <p>+237 6XX XXX XXX • contact@geocasagroup.com</p>
          </div>
        </div>
      </div>

      {/* Division Offices Modal */}
      {showDivisionOffices && selectedDivision && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className={`w-16 h-16 ${selectedDivision.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">
                      {language === 'en' ? selectedDivision.nameEn : selectedDivision.nameFr}
                    </h2>
                    <p className="text-blue-100 text-lg">
                      {selectedDivision.offices.length} {language === 'en' ? 'offices' : 'bureaux'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDivisionOffices(false)}
                  className="text-white hover:text-gray-200 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Bureaux de la Division</h3>
              
              {/* Offices List */}
              <div className="space-y-4 mb-6">
                {currentOffices.map((office, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{office.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{office.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>{office.location || "Yaoundé, Cameroun"}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onSelectOffice(office)}
                        className="ml-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center space-x-2"
                      >
                        <span>Sélectionner</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Office Pagination Controls */}
              {selectedDivision.offices.length > officesPerPage && (
                <div className="flex justify-center items-center mb-6 space-x-4">
                  <button
                    onClick={prevOfficePage}
                    disabled={currentOfficePage === 1}
                    className={`p-2 rounded-full ${currentOfficePage === 1 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-blue-100 hover:bg-blue-200'} transition-colors`}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  
                  <span className="text-gray-700 font-medium">
                    {currentOfficePage} / {totalOfficePages}
                  </span>
                  
                  <button
                    onClick={nextOfficePage}
                    disabled={currentOfficePage === totalOfficePages}
                    className={`p-2 rounded-full ${currentOfficePage === totalOfficePages 
                      ? 'bg-gray-300 cursor-not-allowed' 
                      : 'bg-blue-100 hover:bg-blue-200'} transition-colors`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowDivisionOffices(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {showUserDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-3xl p-8 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <img
                    src="/default.png"
                    alt={user.name}
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300';
                    }}
                  />
                  <div>
                    <h2 className="text-3xl font-bold">{user.name}</h2>
                    <p className="text-blue-100 text-lg">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="text-white hover:text-gray-200 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* User Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations Personnelles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <UserIcon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900">{user.name}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-900">Membre depuis 2023</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Statistiques</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Départements assignés</span>
                      <span className="font-semibold text-gray-900">{departments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Divisions assignées</span>
                      <span className="font-semibold text-gray-900">{divisions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Statut</span>
                      <span className="font-semibold text-green-600">Actif</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Départements Assignés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {departments.map((dept) => (
                    <div key={dept.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{dept.nameFr}</h4>
                      <p className="text-sm text-gray-600 mb-3">{dept.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          Accès complet
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divisions */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Divisions Assignées</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {divisions.map((div) => (
                    <div key={div.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-2">{div.nameFr}</h4>
                      <p className="text-sm text-gray-600 mb-3">{div.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                          {div.offices.length} bureaux
                        </span>
                        <span className="text-xs text-gray-500">Superviseur</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setShowUserDetails(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnifiedSelector;