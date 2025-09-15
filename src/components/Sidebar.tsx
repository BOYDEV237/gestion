import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  UserCheck,
  FolderOpen,
  Send,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Department, Division, User } from '../types';

interface SidebarProps {
  user: User;
  department: Department;
  division?: Division;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  department, 
  division,
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle 
}) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuItems = [
    {
      id: 'main',
      title: 'Principal',
      icon: Home,
      items: [
        { id: 'dashboard', title: 'Tableau de bord', icon: Home },
        { id: 'overview', title: 'Vue d\'ensemble', icon: FolderOpen }
      ]
    },
    {
      id: 'documents',
      title: 'Documents',
      icon: FileText,
      items: [
        { id: 'all-documents', title: 'Tous les documents', icon: FileText },
        { id: 'pending-documents', title: 'En attente', icon: Clock },
        { id: 'completed-documents', title: 'Terminés', icon: CheckCircle },
        { id: 'blocked-documents', title: 'Bloqués', icon: AlertTriangle }
      ]
    },
    {
      id: 'settings',
      title: 'Paramètres',
      icon: Settings,
      items: [
        { id: 'profile', title: 'Profil', icon: Users },
        { id: 'preferences', title: 'Préférences', icon: Settings }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-white shadow-2xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
        w-80
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900 text-lg">Navigation</h2>
                <p className="text-sm text-gray-600">{department.nameFr}</p>
                {division && <p className="text-xs text-gray-500">{division.nameFr}</p>}
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-4 space-y-2">
              {menuItems.map((section) => (
                <div key={section.id} className="space-y-1">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-100 rounded-xl transition-colors duration-200 group"
                  >
                    <div className="flex items-center space-x-3">
                      <section.icon className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="font-medium">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {expandedSections.includes(section.id) && (
                    <div className="ml-4 space-y-1">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => onSectionChange(item.id)}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left rounded-lg transition-all duration-200 ${
                            activeSection === item.id
                              ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <item.icon className={`w-4 h-4 ${
                            activeSection === item.id ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <span className="text-sm font-medium">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;