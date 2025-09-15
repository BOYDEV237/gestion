import React, { useState } from 'react';
import { 
  Archive,
  Target,
  BookOpen, 
  Zap, 
  Users, 
  FileText, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  Upload,
  Download,
  Star,
  Calendar,
  User as UserIcon,
  Building,
  Mail,
  Phone,
  MapPin,
  FileCheck,
  Send,
  DollarSign,
  BarChart3,
  Settings,
  Shield,
  Library,
  History,
  ClipboardList,
  UserCheck,
  Cog
} from 'lucide-react';
import { User } from '../../../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, AreaChart, Area } from 'recharts';

interface ArchivesDashboardProps {
  user: User;
  activeSection: string;
}

const ArchivesDashboard: React.FC<ArchivesDashboardProps> = ({ user, activeSection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('normale');
  const [selectedClientType, setSelectedClientType] = useState('');

  // Mock data for prestations
  const prestationsStats = {
    total: 156,
    nouvelles: 12,
    en_attente: 8,
    en_cours: 23,
    validees: 15,
    complements: 6,
    livrees: 89,
    annulees: 3
  };

  const prestationsData = [
    { name: 'Nouvelles', value: 12, color: '#3B82F6' },
    { name: 'En cours', value: 23, color: '#10B981' },
    { name: 'Validées', value: 15, color: '#F59E0B' },
    { name: 'Livrées', value: 89, color: '#8B5CF6' },
    { name: 'Annulées', value: 3, color: '#EF4444' }
  ];

  const monthlyPrestations = [
    { month: 'Jan', nouvelles: 8, traitees: 12, livrees: 15 },
    { month: 'Fév', nouvelles: 12, traitees: 18, livrees: 20 },
    { month: 'Mar', nouvelles: 15, traitees: 22, livrees: 25 },
    { month: 'Avr', nouvelles: 12, traitees: 19, livrees: 23 }
  ];

  const satisfactionData = [
    { month: 'Jan', satisfaction: 94, delai: 8.2 },
    { month: 'Fév', satisfaction: 96, delai: 7.8 },
    { month: 'Mar', satisfaction: 97, delai: 8.5 },
    { month: 'Avr', satisfaction: 95, delai: 9.1 }
  ];

  const volumeByService = [
    { service: 'Foncier', volume: 45 },
    { service: 'Juridique', volume: 32 },
    { service: 'Technique', volume: 28 },
    { service: 'Commercial', volume: 25 },
    { service: 'Admin', volume: 18 }
  ];

  // Mock data for archives
  const archivesStats = {
    total: 2847,
    nouveaux: 23,
    consultes: 45,
    empruntes: 12
  };

  const archivesData = [
    { name: 'Administratifs', value: 35, color: '#3B82F6' },
    { name: 'RH', value: 20, color: '#10B981' },
    { name: 'Juridique', value: 18, color: '#F59E0B' },
    { name: 'Foncier', value: 15, color: '#8B5CF6' },
    { name: 'Autres', value: 12, color: '#EF4444' }
  ];

  // Mock data for bibliotheque
  const bibliothequeStats = {
    total: 1245,
    disponibles: 1156,
    empruntes: 78,
    retards: 11
  };

  const bibliothequeData = [
    { name: 'Internes', value: 40, color: '#3B82F6' },
    { name: 'Modèles GeoCASA', value: 25, color: '#10B981' },
    { name: 'Institutionnels', value: 20, color: '#F59E0B' },
    { name: 'Publications', value: 15, color: '#8B5CF6' }
  ];

  const clientTypes = [
    'Propriétaire', 'Acquéreur', 'Mandataire / Représentant', 'Promoteur immobilier',
    'Investisseur', 'Facilitateur / Intermédiaire', 'Entreprise privée', 'Administration publique',
    'Collectivité locale / Communauté', 'Organisation / Institution', 'Locataire / Occupant',
    'Héritier / Succession', 'Demandeur de service ponctuel', 'Autre qualité'
  ];

  const documentTypes = [
    'Documents administratifs', 'Ressources Humaines (RH)', 'Juridique & contractuel',
    'Finances & comptabilité', 'Foncier & cadastral', 'Dossiers, Projets & études',
    'Courrier & communication', 'Informatique & numérique', 'Logistique & patrimoine',
    'Archives stratégiques & confidentielles'
  ];

  const prestationsList = [
    { id: 'PREST-2024-001', client: 'Jean Mballa', type: 'Titre Foncier', statut: 'en_cours', date: '2024-01-20', priorite: 'normale', progress: 65 },
    { id: 'PREST-2024-002', client: 'Marie Nguema', type: 'Étude Technique', statut: 'validee', date: '2024-01-19', priorite: 'urgente', progress: 85 },
    { id: 'PREST-2024-003', client: 'Paul Essomba', type: 'Procédure Admin', statut: 'nouvelle', date: '2024-01-21', priorite: 'normale', progress: 15 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'nouvelle': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'validee': return 'bg-green-100 text-green-800';
      case 'livree': return 'bg-purple-100 text-purple-800';
      case 'annulee': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'urgente' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800';
  };

  // Render functions for each section
  const renderPrestationsDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Gestion des Prestations</h1>
              <p className="text-orange-100 text-base lg:text-lg">Tableau de bord des prestations</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-bold">{prestationsStats.total}</div>
            <div className="text-orange-200 text-sm lg:text-base">Total prestations</div>
          </div>
        </div>
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-800">5</div>
              <div className="text-sm text-red-600">Prestations urgentes</div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <FileCheck className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-800">8</div>
              <div className="text-sm text-yellow-600">Pièces manquantes</div>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-orange-600" />
            <div>
              <div className="text-2xl font-bold text-orange-800">3</div>
              <div className="text-sm text-orange-600">Prestations en retard</div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateurs clés */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">8.5</div>
            <div className="text-sm text-gray-600">Délai moyen (jours)</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">97%</div>
            <div className="text-sm text-gray-600">Satisfaction client</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">23</div>
            <div className="text-sm text-gray-600">Volume mensuel</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">89</div>
            <div className="text-sm text-gray-600">Prestations livrées</div>
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par statut */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Répartition par Statut</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={prestationsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {prestationsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {prestationsData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Volume par service */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Volume par Service</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volumeByService} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="service" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="volume" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Évolution mensuelle */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Évolution Mensuelle</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyPrestations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="nouvelles" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
              <Area type="monotone" dataKey="traitees" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
              <Area type="monotone" dataKey="livrees" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Satisfaction & Délais */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Satisfaction Client & Délais</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={satisfactionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={3} name="Satisfaction (%)" />
              <Line yAxisId="right" type="monotone" dataKey="delai" stroke="#F59E0B" strokeWidth={3} name="Délai moyen (jours)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderNouvellePrestation = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nouvelle Demande de Prestation</h2>
            <p className="text-gray-600 mt-2">Formulaire de création d'une nouvelle prestation</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-800">N° PREST-2024-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</span>
          </div>
        </div>

        <form className="space-y-8">
          {/* Section 1: Informations du client */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🔵 1. Informations du Client</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom et prénom / Raison sociale *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type du client *</label>
                <select 
                  value={selectedClientType}
                  onChange={(e) => setSelectedClientType(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionner le type</option>
                  {clientTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adresse *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                <input type="tel" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Section 2: Détails de la prestation */}
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🟢 2. Détails de la Prestation Demandée</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code Prestation Catalogue</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Procédure choisie</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description de la demande *</label>
                <textarea rows={4} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Situation géographique */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">🟡 3. Situation Géographique des Travaux</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Région *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Département *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Arrondissement</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Lieu-dit</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>
          </div>

          {/* Section 4: Personne de contact */}
          <div className="border-l-4 border-purple-500 pl-6">
            <h3 className="text-lg font-semibold text-purple-900 mb-4">🟣 4. Personne de Contact sur le Terrain</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la personne</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Qualité</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500" />
              </div>
            </div>
          </div>

          {/* Section 5: Documents fournis */}
          <div className="border-l-4 border-orange-500 pl-6">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">🟠 5. Documents Fournis par le Client</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents physiques</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {['Copie CNI / RCCM', 'Titre foncier / Attestation', 'Plan cadastral', 'Procuration', 'Autre'].map((doc) => (
                    <label key={doc} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pièces jointes (PDF, images)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                  <input type="file" multiple className="hidden" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Modalités de traitement */}
          <div className="border-l-4 border-red-500 pl-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">🔴 6. Modalités de Traitement</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Demandé par</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                  <option>Courriel</option>
                  <option>Courrier</option>
                  <option>Dépôt à l'entreprise</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de réception</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                <select 
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="normale">Normale</option>
                  <option value="urgente">Urgente</option>
                </select>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Créer la Prestation</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderSuiviPrestations = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Suivi des Prestations</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une prestation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Workflow */}
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="font-semibold text-gray-900 mb-4">Workflow des Étapes</h4>
          <div className="flex items-center justify-between">
            {['Réception', 'Validation', 'Traitement', 'Livraison', 'Clôture'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    index <= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-gray-700 mt-2">{step}</span>
                </div>
                {index < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < 2 ? 'bg-blue-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">N° Prestation</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Statut</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Priorité</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Progression</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prestationsList.filter(prestation => 
                prestation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prestation.id.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((prestation) => (
                <tr key={prestation.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{prestation.id}</td>
                  <td className="py-3 px-4 text-gray-600">{prestation.client}</td>
                  <td className="py-3 px-4 text-gray-600">{prestation.type}</td>
                  <td className="py-3 px-4 text-gray-600">{prestation.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(prestation.statut)}`}>
                      {prestation.statut}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(prestation.priorite)}`}>
                      {prestation.priorite}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${prestation.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">{prestation.progress}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-700">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderArchivesDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Archive className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Gestion des Archives</h1>
              <p className="text-blue-100 text-base lg:text-lg">Tableau de bord des archives</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-bold">{archivesStats.total}</div>
            <div className="text-blue-200 text-sm lg:text-base">Documents archivés</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{archivesStats.total}</div>
            <div className="text-sm text-gray-600">Total documents</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{archivesStats.nouveaux}</div>
            <div className="text-sm text-gray-600">Nouveaux ce mois</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{archivesStats.consultes}</div>
            <div className="text-sm text-gray-600">Consultés récemment</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{archivesStats.empruntes}</div>
            <div className="text-sm text-gray-600">Actuellement empruntés</div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Répartition par Type de Document</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={archivesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {archivesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {archivesData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Documents Récents</h3>
        <div className="space-y-4">
          {[
            { nom: 'Contrat de vente - Terrain Yaoundé', type: 'Juridique', date: '2024-01-20', statut: 'archivé' },
            { nom: 'Rapport RH - Recrutement 2024', type: 'RH', date: '2024-01-19', statut: 'consulté' },
            { nom: 'Plan cadastral - Lot 245', type: 'Foncier', date: '2024-01-18', statut: 'emprunté' }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{doc.nom}</div>
                  <div className="text-sm text-gray-600">{doc.type} • {doc.date}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.statut)}`}>
                {doc.statut}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNouveauDocument = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Enregistrement d'un Nouveau Document</h2>
            <p className="text-gray-600 mt-2">Formulaire d'archivage d'un nouveau document</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-sm font-medium text-blue-800">Réf: ARC-2024-{String(Math.floor(Math.random() * 1000)).padStart(3, '0')}</span>
          </div>
        </div>

        <form className="space-y-8">
          {/* Section 1: Informations générales */}
          <div className="border-l-4 border-blue-500 pl-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">🔵 1. Informations Générales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre / Objet *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type de document *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Sélectionner le type</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date de création / réception *</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service / Département d'origine</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Responsable / Archiviste</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
            </div>
          </div>

          {/* Section 2: Classement & indexation */}
          <div className="border-l-4 border-green-500 pl-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">🟢 2. Classement & Indexation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="">Sélectionner la catégorie</option>
                  {documentTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Année d'archivage</label>
                <input type="number" min="2020" max="2030" defaultValue="2024" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niveau de confidentialité *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="public">Public</option>
                  <option value="restreint">Restreint</option>
                  <option value="confidentiel">Confidentiel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localisation physique</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
                  <option value="salle">Salle d'archives</option>
                  <option value="bureau-dg">Bureau DG</option>
                  <option value="bureau-rh">Bureau RH</option>
                  <option value="bureau-mc">Bureau MC</option>
                  <option value="secretariat">Secrétariat</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Code d'indexation (généré automatiquement)</label>
                <input type="text" value="ARC-2024-ADM-001" disabled className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Section 3: Fichiers associés */}
          <div className="border-l-4 border-yellow-500 pl-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">🟡 3. Fichiers Associés</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documents numériques</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-yellow-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Glissez vos fichiers ici ou cliquez pour sélectionner</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, Word, images, plans acceptés</p>
                  <input type="file" multiple className="hidden" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Version / Historique</label>
                  <input type="text" placeholder="v1.0" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Localisation numérique</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
                    <option value="serveur">Serveur interne</option>
                    <option value="cloud">Cloud</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lien vers documents liés</label>
                <input type="text" placeholder="Références des documents connectés" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Annuler
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Archive className="w-4 h-4" />
              <span>Archiver le Document</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderBibliotequeDashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">Gestion de la Bibliothèque</h1>
              <p className="text-purple-100 text-base lg:text-lg">Tableau de bord de la bibliothèque</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl lg:text-4xl font-bold">{bibliothequeStats.total}</div>
            <div className="text-purple-200 text-sm lg:text-base">Documents total</div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{bibliothequeStats.total}</div>
            <div className="text-sm text-gray-600">Total documents</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{bibliothequeStats.disponibles}</div>
            <div className="text-sm text-gray-600">Disponibles</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{bibliothequeStats.empruntes}</div>
            <div className="text-sm text-gray-600">Empruntés</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{bibliothequeStats.retards}</div>
            <div className="text-sm text-gray-600">En retard</div>
          </div>
        </div>
      </div>

      {/* Alertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-red-800">{bibliothequeStats.retards}</div>
              <div className="text-sm text-red-600">Documents non retournés</div>
            </div>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
          <div className="flex items-center space-x-3">
            <Clock className="w-8 h-8 text-yellow-600" />
            <div>
              <div className="text-2xl font-bold text-yellow-800">5</div>
              <div className="text-sm text-yellow-600">Réservations en attente</div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Répartition par Catégorie</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={bibliothequeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {bibliothequeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {bibliothequeData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top Documents */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Documents les Plus Consultés</h3>
        <div className="space-y-4">
          {[
            { nom: 'Manuel des procédures foncières', categorie: 'Modèles GeoCASA', consultations: 45, emprunts: 12 },
            { nom: 'Guide juridique immobilier', categorie: 'Institutionnels', consultations: 38, emprunts: 8 },
            { nom: 'Rapport annuel 2023', categorie: 'Internes', consultations: 32, emprunts: 15 }
          ].map((doc, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{doc.nom}</div>
                  <div className="text-sm text-gray-600">{doc.categorie}</div>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="text-center">
                  <div className="font-semibold text-blue-600">{doc.consultations}</div>
                  <div>Consultations</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-green-600">{doc.emprunts}</div>
                  <div>Emprunts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <Archive className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Module en développement
      </h3>
      <p className="text-gray-600">
        Ce module sera bientôt disponible.
      </p>
    </div>
  );

  // Render content based on active section
  switch (activeSection) {
    case 'dashboard':
    case 'overview':
      return renderPrestationsDashboard();
    
    // Prestations modules
    case 'prestations-dashboard':
      return renderPrestationsDashboard();
    case 'nouvelle-prestation':
      return renderNouvellePrestation();
    case 'suivi-prestations':
      return renderSuiviPrestations();
    case 'validation-interne':
    case 'execution-traitement':
    case 'livraison-cloture':
    case 'facturation-paiement':
    case 'rapports-statistiques':
    case 'parametres-modeles':
      return renderDefaultContent();
    
    // Archives modules
    case 'archives-dashboard':
      return renderArchivesDashboard();
    case 'nouveau-document':
      return renderNouveauDocument();
    case 'catalogue-documents':
    case 'prets-consultations':
    case 'recherche-avancee':
    case 'historique-suivi':
    case 'rapports-archives':
    case 'parametres-droits':
      return renderDefaultContent();
    
    // Bibliothèque modules
    case 'bibliotheque-dashboard':
      return renderBibliotequeDashboard();
    case 'catalogue-bibliotheque':
    case 'nouveau-document-bib':
    case 'prets-consultations-bib':
    case 'recherche-avancee-bib':
    case 'historique-suivi-bib':
    case 'rapports-bibliotheque':
    case 'parametres-bibliotheque':
      return renderDefaultContent();
    
    default:
      return renderPrestationsDashboard();
  }
};

export default ArchivesDashboard;