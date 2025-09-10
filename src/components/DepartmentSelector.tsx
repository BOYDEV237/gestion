import React from 'react';
import { MapPin, CreditCard, Building, ArrowRight } from 'lucide-react';
import { Department } from '../types';

interface DepartmentSelectorProps {
  departments: Department[];
  onSelect: (department: Department) => void;
  t: (key: string) => string;
  language: string;
}

const iconMap = {
  MapPin,
  CreditCard,
  Building
};

const DepartmentSelector: React.FC<DepartmentSelectorProps> = ({ 
  departments, 
  onSelect, 
  t,
  language 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-orange-800 flex items-center justify-center p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-white bg-opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-400 bg-opacity-5 rounded-full animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white border-opacity-10 rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
      </div>
      
      <div className="max-w-4xl w-full">
        {/* Header with Company Logo */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white bg-opacity-15 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-white border-opacity-20">
              <Building className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">GeoCasa Group</h1>
          <p className="text-blue-100 text-xl mb-2">{t('selectDepartment')}</p>
          <p className="text-blue-200 text-lg">Choisissez votre département de travail</p>
        </div>

        {/* Department Cards */}
        <div className="text-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((department, index) => {
              const IconComponent = iconMap[department.icon as keyof typeof iconMap];
              
              return (
                <div
                  key={department.id}
                  onClick={() => onSelect(department)}
                  className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 hover:border-opacity-40 transition-all duration-300 shadow-2xl">
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
                        <span className="text-sm font-semibold">Accéder au département</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Information */}
        <div className="text-center mt-12 text-blue-100 text-sm space-y-2">
          <p className="font-medium">Yaoundé, Cameroun</p>
          <p>Heures d'ouverture: 08:00 - 18:00</p>
          <p>+237 6XX XXX XXX • contact@gocasagroup.com</p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentSelector;