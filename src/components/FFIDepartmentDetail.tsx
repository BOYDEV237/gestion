import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CreditCard, 
  Star, 
  Users, 
  Award, 
  FileText, 
  Phone,
  Mail,
  MapPin,
  Eye,
  Calculator,
  Handshake,
  Building2,
  DollarSign,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import AnimatedBackground from './AnimatedBackground';

interface FFIDepartmentDetailProps {
  onBack: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const FFIDepartmentDetail: React.FC<FFIDepartmentDetailProps> = ({
  onBack,
  language,
  setLanguage
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  // Financing offers data
  const financingOffers = {
    fr: [
      {
        id: 'avance-financement',
        title: '🏗️ Avance de Financement Remboursable',
        description: 'GeoCasa vous apporte temporairement des fonds pour débloquer une étape de votre projet (ex. : frais de lotissement, immatriculation, bornage, achat de terrain).',
        conditions: [
          'Signature d\'une convention d\'avance',
          'Apport personnel recommandé',
          'Garantie foncière ou contractuelle exigée',
          'Remboursement échelonné sur 3 à 12 mois'
        ],
        target: 'Propriétaires, promoteurs, héritiers, exploitants fonciers',
        duration: '3-12 mois',
        cost: 'Variable selon projet'
      },
      {
        id: 'portage-foncier',
        title: '🤝 Portage Foncier / Immobilier',
        description: 'GeoCasa Group acquiert ou prend temporairement en charge un bien foncier ou immobilier, le valorise (lotissement, titre foncier, construction), puis le revend ou partage les produits.',
        conditions: [
          'Contrat de portage précisant durée, rôle de chacun et prix de revente',
          'Possibilité de rachat prioritaire par le propriétaire initial',
          'Partage des risques et bénéfices selon le modèle établi'
        ],
        target: 'Héritiers, propriétaires sans moyens, terrains bloqués ou en indivision',
        duration: '6-24 mois',
        cost: 'Partage des bénéfices'
      },
      {
        id: 'partenariat-developpement',
        title: '🧠 Partenariat de Développement Foncier ou Immobilier',
        description: 'GeoCasa Group s\'associe avec un propriétaire ou promoteur pour réaliser un projet (lotissement, immeuble, cité, projet agricole ou agro-industriel).',
        conditions: [
          'Partage des apports (terrain, capital, ingénierie)',
          'Répartition claire des bénéfices, du foncier ou des produits',
          'Signature d\'un protocole d\'accord'
        ],
        target: 'Propriétaires, promoteurs en recherche de partenaires',
        duration: '12-36 mois',
        cost: 'Partage selon accord'
      },
      {
        id: 'assistance-technique',
        title: '📄 Assistance Technique & Juridique Personnalisée',
        description: 'Vous disposez d\'un projet mais avez besoin d\'un accompagnement administratif, foncier ou juridique pour le structurer, le rendre finançable ou le protéger.',
        conditions: [
          'Études de faisabilité foncière',
          'Plans de montage juridique (portage, indivision, succession, GIC, SCI, etc.)',
          'Dossiers de financement ou de partenariat',
          'Représentation auprès des services de l\'État'
        ],
        target: 'Facilitateurs, promoteurs, copropriétaires, exploitants fonciers',
        duration: '1-6 mois',
        cost: '50,000 - 200,000 FCFA'
      },
      {
        id: 'accompagnement-complet',
        title: '🧾 Accompagnement Complet sur Projet Clé-en-main',
        description: 'GeoCasa prend en charge l\'ensemble du projet : études, financement, procédures, suivi, jusqu\'à la livraison ou la vente.',
        conditions: [
          'Études préalables et budget',
          'Montage financier et juridique',
          'Pilotage administratif et technique',
          'Vente finale ou mise en valeur'
        ],
        target: 'Promoteurs, investisseurs passifs, héritiers à l\'étranger, collectivités',
        duration: '12-48 mois',
        cost: 'Selon projet'
      }
    ],
    en: [
      {
        id: 'financing-advance',
        title: '🏗️ Repayable Financing Advance',
        description: 'GeoCasa temporarily provides you with funds to unlock a stage of your project (e.g.: subdivision fees, registration, boundary marking, land purchase).',
        conditions: [
          'Signing of an advance agreement',
          'Personal contribution recommended',
          'Land or contractual guarantee required',
          'Staggered repayment over 3 to 12 months'
        ],
        target: 'Owners, developers, heirs, land operators',
        duration: '3-12 months',
        cost: 'Variable according to project'
      },
      {
        id: 'land-holding',
        title: '🤝 Land / Real Estate Holding',
        description: 'GeoCasa Group acquires or temporarily takes charge of a land or real estate asset, enhances it (subdivision, land title, construction), then resells it or shares the proceeds.',
        conditions: [
          'Holding contract specifying duration, role of each party and resale price',
          'Possibility of priority buyback by the initial owner',
          'Sharing of risks and benefits according to the established model'
        ],
        target: 'Heirs, owners without means, blocked or jointly owned land',
        duration: '6-24 months',
        cost: 'Profit sharing'
      },
      {
        id: 'development-partnership',
        title: '🧠 Land or Real Estate Development Partnership',
        description: 'GeoCasa Group partners with an owner or developer to carry out a project (subdivision, building, housing estate, agricultural or agro-industrial project).',
        conditions: [
          'Sharing of contributions (land, capital, engineering)',
          'Clear distribution of profits, land or products',
          'Signing of a protocol agreement'
        ],
        target: 'Owners, developers looking for partners',
        duration: '12-36 months',
        cost: 'Sharing according to agreement'
      },
      {
        id: 'technical-assistance',
        title: '📄 Personalized Technical & Legal Assistance',
        description: 'You have a project but need administrative, land or legal support to structure it, make it financeable or protect it.',
        conditions: [
          'Land feasibility studies',
          'Legal structuring plans (holding, joint ownership, succession, GIC, SCI, etc.)',
          'Financing or partnership files',
          'Representation with State services'
        ],
        target: 'Facilitators, developers, co-owners, land operators',
        duration: '1-6 months',
        cost: '50,000 - 200,000 FCFA'
      },
      {
        id: 'complete-support',
        title: '🧾 Complete Turnkey Project Support',
        description: 'GeoCasa takes charge of the entire project: studies, financing, procedures, monitoring, until delivery or sale.',
        conditions: [
          'Preliminary studies and budget',
          'Financial and legal structuring',
          'Administrative and technical management',
          'Final sale or enhancement'
        ],
        target: 'Developers, passive investors, heirs abroad, communities',
        duration: '12-48 months',
        cost: 'According to project'
      }
    ]
  };

  // Available images from public folder
  const availableImages = [
    '/IMG-20250911-WA0007.jpg',
    '/IMG-20250911-WA0008.jpg',
    '/IMG-20250911-WA0009.jpg',
    '/IMG-20250911-WA0010.jpg',
    '/IMG-20250911-WA0011.jpg'
  ];

  const renderOverview = () => (
    <div className="space-y-16">
      {/* Department Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-orange-500 rounded-3xl flex items-center justify-center shadow-2xl">
            <CreditCard className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Real Estate and Land Financing Department' : 'Département Financement Foncier & Immobilier'}
          </span>
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full mx-auto mb-8"></div>
        <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Innovative financial solutions and strategic partnerships to realize your real estate and land projects.'
            : 'Solutions financières innovantes et partenariats stratégiques pour concrétiser vos projets immobiliers et fonciers.'
          }
        </p>
        
        {/* Objective Section */}
        <div className="mt-12 bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-4">
            🎯 {language === 'en' ? 'Objective of our offers' : 'Objectif de nos offres'}
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            {language === 'en' 
              ? 'Support project holders in land and real estate by offering adapted solutions for financing, legal structuring, project development and strategic partnership.'
              : 'Accompagner les porteurs de projets fonciers et immobiliers en proposant des solutions adaptées de financement, de structuration juridique, de montage de projet et de partenariat stratégique.'
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
          <DollarSign className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">4.6M€</div>
          <div className="text-blue-100">{language === 'en' ? 'Total Volume' : 'Volume Total'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Handshake className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">77</div>
          <div className="text-blue-100">{language === 'en' ? 'Financial Partners' : 'Partenaires Financiers'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Building2 className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">156</div>
          <div className="text-blue-100">{language === 'en' ? 'Projects Financed' : 'Projets Financés'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">95%</div>
          <div className="text-blue-100">{language === 'en' ? 'Success Rate' : 'Taux de Succès'}</div>
        </div>
      </div>
    </div>
  );

  const renderOffers = () => (
    <div className="space-y-12">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            🧩 {language === 'en' ? 'Our Support Offers' : 'Nos offres d\'accompagnement'}
          </span>
        </h3>
      </div>

      <div className="space-y-8">
        {(language === 'en' ? financingOffers.en : financingOffers.fr).map((offer, index) => (
          <div key={offer.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
            <div className="mb-6">
              <h4 className="text-2xl font-bold text-white mb-4">{offer.title}</h4>
              <p className="text-blue-100 text-lg leading-relaxed mb-6">{offer.description}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Conditions */}
              <div>
                <h5 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                  {language === 'en' ? 'Conditions:' : 'Conditions :'}
                </h5>
                <ul className="space-y-2">
                  {offer.conditions.map((condition, idx) => (
                    <li key={idx} className="text-blue-100 flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target & Details */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-lg font-semibold text-white mb-2 flex items-center">
                    <Users className="w-5 h-5 text-blue-400 mr-2" />
                    {language === 'en' ? 'Target:' : 'Cible :'}
                  </h5>
                  <p className="text-blue-100">{offer.target}</p>
                </div>
                
                <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-orange-300" />
                    <span className="text-white font-medium">{offer.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-green-300" />
                    <span className="text-white font-medium">{offer.cost}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* General Terms */}
      <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
        <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
          📌 {language === 'en' ? 'General Terms' : 'Modalités générales'}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ul className="space-y-3">
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Free basic file analysis'
                : 'Analyse gratuite du dossier de base'
              }
            </li>
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Mandatory agreement before any commitment'
                : 'Convention obligatoire avant tout engagement'
              }
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Technical or support fees according to offer type'
                : 'Paiement de frais techniques ou d\'accompagnement selon le type d\'offre'
              }
            </li>
            <li className="text-blue-100 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              {language === 'en' 
                ? 'Transparency on expected returns, deadlines and responsibilities'
                : 'Transparence sur les retours attendus, échéances et responsabilités'
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
          <span className="bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
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
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
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
                <p className="text-white font-semibold">financement@geocasagroup.com</p>
                <p className="text-blue-200 text-sm">
                  {language === 'en' ? 'Email us your projects' : 'Envoyez-nous vos projets'}
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

        {/* Financing Request Form */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">
            {language === 'en' ? 'Financing Request' : 'Demande de Financement'}
          </h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === 'en' ? 'Your Name' : 'Votre Nom'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="email"
              placeholder={language === 'en' ? 'Your Email' : 'Votre Email'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option value="">
                {language === 'en' ? 'Select Financing Type' : 'Type de Financement'}
              </option>
              <option value="avance">
                {language === 'en' ? 'Financing Advance' : 'Avance de Financement'}
              </option>
              <option value="portage">
                {language === 'en' ? 'Land Holding' : 'Portage Foncier'}
              </option>
              <option value="partenariat">
                {language === 'en' ? 'Partnership' : 'Partenariat'}
              </option>
            </select>
            <input
              type="text"
              placeholder={language === 'en' ? 'Project Budget' : 'Budget du Projet'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
              placeholder={language === 'en' ? 'Describe your project...' : 'Décrivez votre projet...'}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
              {language === 'en' ? 'Submit Request' : 'Soumettre la Demande'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Aperçu', icon: Eye },
    { id: 'offers', label: language === 'en' ? 'Financing Offers' : 'Offres de Financement', icon: CreditCard },
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
                        ? 'bg-gradient-to-r from-orange-600 to-blue-600 text-white shadow-lg'
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
            {activeSection === 'offers' && renderOffers()}
            {activeSection === 'contact' && renderContact()}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 text-blue-100 text-sm space-y-3">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Financial Innovation' : 'Innovation Financière'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Strategic Partnerships' : 'Partenariats Stratégiques'}
                </span>
              </div>
            </div>
            <p className="font-medium">GeoCasa Group - Département Financement Foncier & Immobilier</p>
            <p>Yaoundé, Cameroun • +237 6XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FFIDepartmentDetail;