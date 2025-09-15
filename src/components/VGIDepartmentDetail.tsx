import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Building, 
  Star, 
  Users, 
  Award, 
  FileText, 
  Phone,
  Mail,
  MapPin,
  Eye,
  Home,
  Key,
  Shield,
  Megaphone,
  Handshake,
  CheckCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import AnimatedBackground from './AnimatedBackground';

interface VGIDepartmentDetailProps {
  onBack: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const VGIDepartmentDetail: React.FC<VGIDepartmentDetailProps> = ({
  onBack,
  language,
  setLanguage
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  // Sales and Management services data
  const salesServices = {
    fr: [
      {
        id: 'vente-acquisition',
        title: '🏡 Vente & Acquisition de Biens Immobiliers',
        description: 'GeoCasa propose un accompagnement complet pour l\'achat ou la vente de terrains, maisons, appartements et immeubles, que ce soit pour le compte de propriétaires, de partenaires ou sur son propre portefeuille foncier.',
        conditions: [
          'Mandat de vente signé (pour les propriétaires)',
          'Vérification préalable des documents juridiques et cadastraux',
          'Acte de vente signé chez notaire',
          'Possibilité de paiement échelonné selon modalités convenues'
        ],
        target: 'Acheteurs particuliers, investisseurs, propriétaires, promoteurs',
        icon: Home
      },
      {
        id: 'location-gestion',
        title: '🔑 Location & Gestion Locative',
        description: 'GeoCasa gère la mise en location et le suivi locatif des biens immobiliers (appartements, bureaux, immeubles, terrains agricoles ou commerciaux).',
        conditions: [
          'Recherche et sélection de locataires fiables',
          'Rédaction et suivi des contrats de bail',
          'Encaissement et reversement des loyers',
          'Gestion des réclamations et suivi administratif',
          'Production de relevés de gestion pour les propriétaires'
        ],
        target: 'Propriétaires particuliers, promoteurs immobiliers, sociétés',
        icon: Key
      },
      {
        id: 'securisation-transactions',
        title: '📑 Sécurisation Technique & Administrative des Transactions',
        description: 'Nous garantissons la régularité et la sécurité juridique des opérations immobilières.',
        conditions: [
          'Vérification des titres fonciers, PV de bornage, certificats de propriété',
          'Établissement des contrats de réservation, d\'acompte et d\'échéanciers de paiement',
          'Suivi cadastral et mise à jour du plan TF mère et de la mappe cadastrale',
          'Production des actes de vente, baux et attestations',
          'Archivage numérique et physique sécurisé'
        ],
        target: 'Acheteurs, vendeurs, promoteurs, partenaires',
        icon: Shield
      },
      {
        id: 'promotion-marketing',
        title: '📢 Promotion & Marketing Immobilier',
        description: 'GeoCasa met en valeur et promeut les biens à vendre ou à louer grâce à des stratégies modernes et adaptées.',
        conditions: [
          'Campagnes digitales (réseaux sociaux, site web, marketplace)',
          'Supports visuels (brochures, fiches terrains, catalogues, vidéos, visites virtuelles)',
          'Publicités physiques (panneaux, flyers, affiches)',
          'Organisation de visites guidées et journées portes ouvertes'
        ],
        target: 'Propriétaires, promoteurs, investisseurs, agences partenaires',
        icon: Megaphone
      },
      {
        id: 'partenariat-promotion',
        title: '🤝 Offres Partenariat & Promotion Conjointe',
        description: 'GeoCasa s\'associe avec des propriétaires ou promoteurs pour commercialiser efficacement leurs biens.',
        conditions: [
          'Mandat de vente ou partenariat promotionnel',
          'Partage des responsabilités et bénéfices selon accord',
          'Transparence sur les conditions de collaboration',
          'Possibilité de co-investissement sur certains projets stratégiques'
        ],
        target: 'Propriétaires, héritiers, promoteurs à la recherche de partenaires fiables',
        icon: Handshake
      }
    ],
    en: [
      {
        id: 'sales-acquisition',
        title: '🏡 Real Estate Sales & Acquisition',
        description: 'GeoCasa offers complete support for buying or selling land, houses, apartments and buildings, whether on behalf of owners, partners or from its own real estate portfolio.',
        conditions: [
          'Signed sales mandate (for owners)',
          'Prior verification of legal and cadastral documents',
          'Sales deed signed at notary',
          'Possibility of staggered payment according to agreed terms'
        ],
        target: 'Individual buyers, investors, owners, developers',
        icon: Home
      },
      {
        id: 'rental-management',
        title: '🔑 Rental & Property Management',
        description: 'GeoCasa manages the rental and rental monitoring of real estate (apartments, offices, buildings, agricultural or commercial land).',
        conditions: [
          'Search and selection of reliable tenants',
          'Drafting and monitoring of lease contracts',
          'Collection and transfer of rents',
          'Complaint management and administrative follow-up',
          'Production of management statements for owners'
        ],
        target: 'Individual owners, real estate developers, companies',
        icon: Key
      },
      {
        id: 'transaction-security',
        title: '📑 Technical & Administrative Transaction Security',
        description: 'We guarantee the regularity and legal security of real estate operations.',
        conditions: [
          'Verification of land titles, boundary reports, property certificates',
          'Establishment of reservation contracts, deposits and payment schedules',
          'Cadastral monitoring and updating of master TF plan and cadastral map',
          'Production of sales deeds, leases and certificates',
          'Secure digital and physical archiving'
        ],
        target: 'Buyers, sellers, developers, partners',
        icon: Shield
      },
      {
        id: 'promotion-marketing',
        title: '📢 Real Estate Promotion & Marketing',
        description: 'GeoCasa enhances and promotes properties for sale or rent through modern and adapted strategies.',
        conditions: [
          'Digital campaigns (social networks, website, marketplace)',
          'Visual materials (brochures, land sheets, catalogs, videos, virtual tours)',
          'Physical advertising (panels, flyers, posters)',
          'Organization of guided tours and open house days'
        ],
        target: 'Owners, developers, investors, partner agencies',
        icon: Megaphone
      },
      {
        id: 'partnership-promotion',
        title: '🤝 Partnership & Joint Promotion Offers',
        description: 'GeoCasa partners with owners or developers to effectively market their properties.',
        conditions: [
          'Sales mandate or promotional partnership',
          'Sharing of responsibilities and benefits according to agreement',
          'Transparency on collaboration conditions',
          'Possibility of co-investment on certain strategic projects'
        ],
        target: 'Owners, heirs, developers looking for reliable partners',
        icon: Handshake
      }
    ]
  };

  // Available images from public folder
  const availableImages = [
    '/IMG-20250911-WA0001.jpg',
    '/IMG-20250911-WA0002.jpg',
    '/IMG-20250911-WA0003.jpg',
    '/IMG-20250911-WA0004.jpg',
    '/IMG-20250911-WA0005.jpg'
  ];

  const renderOverview = () => (
    <div className="space-y-16">
      {/* Department Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-gray-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <Building className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-gray-400 to-blue-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Real Estate Sales & Management Department' : 'Département Vente & Gestion Immobilière'}
          </span>
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-gray-400 to-blue-400 rounded-full mx-auto mb-8"></div>
        <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Professional marketing and complete management of your real estate portfolio with rigorous legal monitoring.'
            : 'Commercialisation professionnelle et gestion complète de votre patrimoine immobilier avec un suivi juridique rigoureux.'
          }
        </p>
        
        {/* Objective Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            🎯 {language === 'en' ? 'Objective of our offers' : 'Objectif de nos offres'}
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            {language === 'en' 
              ? 'Support our clients, partners and investors in renting, buying, selling and secure management of real estate (land, houses, buildings), ensuring transparency, administrative security and optimal valorization of proposed properties.'
              : 'Accompagner nos clients, partenaires et investisseurs dans la location, l\'achat, la vente et la gestion sécurisée des biens immobiliers (terrains, maisons, immeubles), en assurant transparence, sécurité administrative et valorisation optimale des biens proposés.'
            }
          </p>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableImages.map((image, index) => (
          <div key={index} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-xl rounded-2xl transform rotate-1 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl p-4 border border-white/30 shadow-xl">
              <img
                src={image}
                alt={`Service ${index + 1}`}
                className="w-full h-48 object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">350+</div>
          <div className="text-blue-100">{language === 'en' ? 'Properties Sold' : 'Biens Vendus'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Key className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">89</div>
          <div className="text-blue-100">{language === 'en' ? 'Properties Managed' : 'Biens Gérés'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">156</div>
          <div className="text-blue-100">{language === 'en' ? 'Active Clients' : 'Clients Actifs'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">94%</div>
          <div className="text-blue-100">{language === 'en' ? 'Satisfaction Rate' : 'Taux de Satisfaction'}</div>
        </div>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-gray-400 to-blue-400 bg-clip-text text-transparent">
            🧩 {language === 'en' ? 'Our Services' : 'Nos offres de services'}
          </span>
        </h3>
      </div>

      <div className="space-y-8">
        {(language === 'en' ? salesServices.en : salesServices.fr).map((service, index) => (
          <div key={service.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="flex items-start space-x-6 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="text-2xl font-bold text-white mb-4">{service.title}</h4>
                <p className="text-blue-100 text-lg leading-relaxed mb-6">{service.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Services/Conditions */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {language === 'en' ? 'Services included:' : 'Services inclus :'}
                </h5>
                <ul className="space-y-2">
                  {service.conditions.map((condition, idx) => (
                    <li key={idx} className="text-blue-100 flex items-start">
                      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Users className="w-5 h-5 text-blue-400 mr-2" />
                    {language === 'en' ? 'Target:' : 'Cible :'}
                  </h5>
                  <p className="text-blue-100">{service.target}</p>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-300" />
                      <span className="text-white font-medium">
                        {language === 'en' ? 'Secure Process' : 'Processus Sécurisé'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-300" />
                      <span className="text-white font-medium">
                        {language === 'en' ? 'Professional Service' : 'Service Professionnel'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General Terms */}
      <div className="bg-gradient-to-r from-gray-500/20 to-blue-500/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
        <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
          📌 {language === 'en' ? 'General Terms' : 'Modalités générales'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Free basic client/owner file analysis'
                : 'Analyse gratuite du dossier de base du client/propriétaire'
              }
            </li>
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Mandatory agreement (mandate, reservation contract or lease) before any operation'
                : 'Convention obligatoire (mandat, contrat de réservation ou bail) avant toute opération'
              }
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Technical or administrative fees applicable according to service type'
                : 'Frais techniques ou administratifs applicables selon le type de service'
              }
            </li>
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Transparency and regular reporting to client or partner'
                : 'Transparence et reporting régulier auprès du client ou du partenaire'
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-12">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-gray-400 to-purple-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Contact Us' : 'Nous Contacter'}
          </span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">
            {language === 'en' ? 'Get in Touch' : 'Contactez-nous'}
          </h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">+237 6XX XXX XXX</p>
                <p className="text-blue-200 text-sm">
                  {language === 'en' ? 'Call us anytime' : 'Appelez-nous à tout moment'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">vente@geocasagroup.com</p>
                <p className="text-blue-200 text-sm">
                  {language === 'en' ? 'Email us your properties' : 'Envoyez-nous vos biens'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">Yaoundé, Cameroun</p>
                <p className="text-blue-200 text-sm">
                  {language === 'en' ? 'Visit our office' : 'Visitez notre bureau'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Listing Form */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">
            {language === 'en' ? 'List Your Property' : 'Proposer Votre Bien'}
          </h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === 'en' ? 'Your Name' : 'Votre Nom'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="email"
              placeholder={language === 'en' ? 'Your Email' : 'Votre Email'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gray-400">
              <option value="">
                {language === 'en' ? 'Property Type' : 'Type de Bien'}
              </option>
              <option value="terrain">
                {language === 'en' ? 'Land' : 'Terrain'}
              </option>
              <option value="maison">
                {language === 'en' ? 'House' : 'Maison'}
              </option>
              <option value="appartement">
                {language === 'en' ? 'Apartment' : 'Appartement'}
              </option>
              <option value="immeuble">
                {language === 'en' ? 'Building' : 'Immeuble'}
              </option>
            </select>
            <input
              type="text"
              placeholder={language === 'en' ? 'Location' : 'Localisation'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <input
              type="text"
              placeholder={language === 'en' ? 'Price' : 'Prix'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <textarea
              placeholder={language === 'en' ? 'Property description...' : 'Description du bien...'}
              rows={3}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-gray-600 to-blue-600 hover:from-gray-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
              {language === 'en' ? 'Submit Property' : 'Soumettre le Bien'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Aperçu', icon: Eye },
    { id: 'services', label: language === 'en' ? 'Our Services' : 'Nos Services', icon: Building },
    { id: 'contact', label: language === 'en' ? 'Contact' : 'Contact', icon: Phone }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Language Switcher - Top Right */}
      <div className="absolute top-6 right-6 z-20">
        <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
      </div>

      {/* Back Button - Top Left */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBack}
          className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">{language === 'en' ? 'Back' : 'Retour'}</span>
        </button>
      </div>

      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-7xl mx-auto pt-24">
          
          {/* Navigation Tabs */}
          <div className="mb-12">
            <div className="bg-white/10 backdrop-blur-2xl rounded-3xl p-2 border border-white/30 shadow-xl">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-gray-600 to-blue-600 text-white shadow-lg'
                        : 'text-blue-100 hover:bg-white/10'
                    }`}
                  >
                    <section.icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="animate-fadeIn">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'services' && renderServices()}
            {activeSection === 'contact' && renderContact()}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 text-blue-100 text-sm space-y-3">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Professional Marketing' : 'Marketing Professionnel'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Secure Management' : 'Gestion Sécurisée'}
                </span>
              </div>
            </div>
            <p className="font-medium">GeoCasa Group - Département Vente & Gestion Immobilière</p>
            <p>Yaoundé, Cameroun • +237 6XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VGIDepartmentDetail;