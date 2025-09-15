import React, { useState, useEffect } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { User as UserType, Department, Division, DocumentFlow } from '../types';
import Header from './Header';
import Sidebar from './Sidebar';
import LandCadastralDashboard from './dashboards/LandCadastralDashboard';
import FinancingDashboard from './dashboards/FinancingDashboard';
import SalesManagementDashboard from './dashboards/SalesManagementDashboard';

interface DashboardProps {
  user: UserType;
  department: Department;
  division?: Division;
  onLogout: () => void;
  t: (key: string) => string;
  language: string;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user, 
  department, 
  division,
  onLogout, 
  t, 
  language 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [notifications] = useState(3); // Mock notification count

  // Mock document flow data
  const [documentFlows] = useState<DocumentFlow[]>([
    {
      id: '1',
      clientName: 'Jean Mballa',
      requestType: 'Titre Foncier',
      currentBureau: 'legal-studies',
      status: 'in-progress',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date(),
      progress: 65
    },
    {
      id: '2',
      clientName: 'Marie Nguema',
      requestType: 'Étude Topographique',
      currentBureau: 'technical-studies',
      status: 'pending',
      createdAt: new Date('2024-01-16'),
      updatedAt: new Date(),
      progress: 25
    },
    {
      id: '3',
      clientName: 'Paul Essomba',
      requestType: 'Procédure Administrative',
      currentBureau: 'administrative-procedures',
      status: 'completed',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date(),
      progress: 100
    }
  ]);

  const renderContent = () => {
    // Common sections
    switch (activeSection) {
      case 'dashboard':
      case 'overview':
        switch (department.id) {
          case 'land-cadastral':
            return <LandCadastralDashboard />;
          case 'financing':
            return <FinancingDashboard />;
          case 'sales-management':
            return <SalesManagementDashboard />;
          default:
            return <LandCadastralDashboard />;
        }
      default:
        return <div className="p-6 text-center text-gray-500">Section en développement...</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} t={t} />
      
      {/* Quick Actions Bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Tableau de bord - {department.nameFr} {division ? `| ${division.nameFr}` : ''}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400 w-48"
                />
              </div>
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          user={user}
          department={department}
          division={division}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen bg-gray-50">
          <div className="p-4 sm:p-6">
            {renderContent()}
          </div>
        </main>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;