import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Star, 
  Users, 
  Award, 
  FileText, 
  MapPin, 
  Calculator, 
  Building2, 
  Scale, 
  Map, 
  FileCheck, 
  Eye,
  Phone,
  Mail,
  Clock,
  Euro,
  User,
  Building
} from 'lucide-react';
import { Language } from '../types';
import LanguageSwitcher from './LanguageSwitcher';
import AnimatedBackground from './AnimatedBackground';

interface GFCDepartmentDetailProps {
  onBack: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const GFCDepartmentDetail: React.FC<GFCDepartmentDetailProps> = ({
  onBack,
  language,
  setLanguage
}) => {
  const [activeSection, setActiveSection] = useState('overview');

  // Land Management Procedures Data
  const landProcedures = {
    foncier: [
      {
        id: 'immatriculation',
        titleFr: 'Immatriculation Directe',
        titleEn: 'Direct Registration',
        descriptionFr: 'L\'immatriculation directe consiste à enregistrer une parcelle ou un terrain en tant que bien foncier officiel dans les registres cadastraux. Cette procédure permet au propriétaire d\'obtenir un titre foncier officiel, qui devient la preuve légale et incontestable de son droit de propriété sur la parcelle.',
        descriptionEn: 'Direct registration involves recording a plot or land as an official real estate asset in cadastral registers. This procedure allows the owner to obtain an official land title, which becomes legal and indisputable proof of their property rights on the plot.',
        duration: '3-6 mois',
        cost: '150,000 - 300,000 FCFA',
        icon: FileText
      },
      {
        id: 'concession-provisoire',
        titleFr: 'Concession Provisoire',
        titleEn: 'Provisional Concession',
        descriptionFr: 'La concession provisoire est une attribution temporaire d\'un droit d\'usage sur une parcelle de terrain avant que cette dernière ne soit régularisée de manière définitive. Elle permet d\'occuper légalement le terrain pendant une période déterminée.',
        descriptionEn: 'Provisional concession is a temporary allocation of usage rights on a plot of land before it is definitively regularized. It allows legal occupation of the land for a determined period.',
        duration: '1-3 mois',
        cost: '75,000 - 150,000 FCFA',
        icon: Clock
      },
      {
        id: 'concession-definitive',
        titleFr: 'Concession Définitive',
        titleEn: 'Definitive Concession',
        descriptionFr: 'La concession définitive constitue l\'attribution permanente d\'un droit foncier sur une parcelle. Une fois accordée, elle confère au bénéficiaire un droit de propriété durable, équivalant au droit de posséder, d\'utiliser ou de transférer la parcelle.',
        descriptionEn: 'Definitive concession constitutes the permanent allocation of land rights on a plot. Once granted, it confers on the beneficiary a lasting property right, equivalent to the right to possess, use or transfer the plot.',
        duration: '6-12 mois',
        cost: '300,000 - 500,000 FCFA',
        icon: CheckCircle
      },
      {
        id: 'gre-a-gre',
        titleFr: 'Gré à Gré',
        titleEn: 'Mutual Agreement',
        descriptionFr: 'Le gré à gré fait référence à une transaction foncière entre deux parties, que ce soit entre des entités privées ou publiques. Il s\'agit d\'un contrat sous forme de transaction amiable pour des terrains spécifiques.',
        descriptionEn: 'Mutual agreement refers to a land transaction between two parties, whether between private or public entities. It is a contract in the form of an amicable transaction for specific lands.',
        duration: '2-4 mois',
        cost: '100,000 - 250,000 FCFA',
        icon: Building2
      }
    ],
    cadastral: [
      {
        id: 'morcellement-notarie',
        titleFr: 'Morcellement Notarié',
        titleEn: 'Notarized Subdivision',
        descriptionFr: 'Le morcellement notarié consiste à diviser une grande parcelle en plusieurs lots plus petits. Ce processus, qui doit être validé par un notaire, assure la conformité juridique de la division.',
        descriptionEn: 'Notarized subdivision involves dividing a large plot into several smaller lots. This process, which must be validated by a notary, ensures legal compliance of the division.',
        duration: '4-8 mois',
        cost: '200,000 - 400,000 FCFA',
        icon: Map
      },
      {
        id: 'mutation-notariee',
        titleFr: 'Mutation Notariée',
        titleEn: 'Notarized Transfer',
        descriptionFr: 'La mutation notariée est le transfert officiel de la propriété d\'une parcelle foncière d\'une personne à une autre. Cette procédure implique un acte notarié qui enregistre juridiquement le changement de propriétaire.',
        descriptionEn: 'Notarized transfer is the official transfer of ownership of a land plot from one person to another. This procedure involves a notarized act that legally records the change of owner.',
        duration: '2-3 mois',
        cost: '150,000 - 300,000 FCFA',
        icon: FileCheck
      },
      {
        id: 'lotissement',
        titleFr: 'Lotissement',
        titleEn: 'Land Development',
        descriptionFr: 'Le lotissement fait référence à la division d\'une grande parcelle en plusieurs unités plus petites, souvent destinées à la vente ou au développement immobilier.',
        descriptionEn: 'Land development refers to the division of a large plot into several smaller units, often intended for sale or real estate development.',
        duration: '6-12 mois',
        cost: '500,000 - 1,000,000 FCFA',
        icon: Building2
      },
      {
        id: 'decoupage-partage',
        titleFr: 'Découpage et Partage',
        titleEn: 'Division and Sharing',
        descriptionFr: 'Le découpage et partage est une procédure qui intervient lorsque plusieurs copropriétaires ou héritiers doivent diviser une parcelle commune.',
        descriptionEn: 'Division and sharing is a procedure that occurs when several co-owners or heirs must divide a common plot.',
        duration: '3-6 mois',
        cost: '200,000 - 350,000 FCFA',
        icon: Users
      }
    ],
    administrative: [
      {
        id: 'duplication-titre',
        titleFr: 'Duplication de Titre Foncier',
        titleEn: 'Land Title Duplication',
        descriptionFr: 'Un duplicatum de titre foncier est demandé lorsque le document original est perdu ou détérioré. Cette procédure permet de reproduire un titre foncier officiel.',
        descriptionEn: 'A land title duplicate is requested when the original document is lost or damaged. This procedure allows reproduction of an official land title.',
        duration: '1-2 mois',
        cost: '50,000 - 100,000 FCFA',
        icon: FileText
      },
      {
        id: 'retrait-indivision',
        titleFr: 'Retrait d\'indivision',
        titleEn: 'Withdrawal from Joint Ownership',
        descriptionFr: 'Le retrait d\'indivision est le processus permettant de diviser les biens détenus en indivision entre les co-indivisaires afin que chacun puisse en obtenir la pleine propriété.',
        descriptionEn: 'Withdrawal from joint ownership is the process allowing division of jointly held assets among co-owners so each can obtain full ownership.',
        duration: '4-8 mois',
        cost: '250,000 - 400,000 FCFA',
        icon: Scale
      },
      {
        id: 'morcellement-judiciaire',
        titleFr: 'Morcellement judiciaire',
        titleEn: 'Judicial Subdivision',
        descriptionFr: 'Le morcellement judiciaire est un morcellement de terrain ordonné par un tribunal pour résoudre un conflit entre copropriétaires ou héritiers.',
        descriptionEn: 'Judicial subdivision is a land subdivision ordered by a court to resolve a conflict between co-owners or heirs.',
        duration: '6-18 mois',
        cost: '300,000 - 600,000 FCFA',
        icon: Building
      },
      {
        id: 'mutation-judiciaire',
        titleFr: 'Mutation judiciaire',
        titleEn: 'Judicial Transfer',
        descriptionFr: 'La mutation judiciaire est un transfert de propriété validé par un tribunal, souvent dans le cadre d\'un conflit, d\'une succession ou d\'un litige foncier.',
        descriptionEn: 'Judicial transfer is a property transfer validated by a court, often in the context of a conflict, succession or land dispute.',
        duration: '8-24 mois',
        cost: '400,000 - 800,000 FCFA',
        icon: Scale
      },
      {
        id: 'rectification-erreur',
        titleFr: 'Rectification d\'erreur Matérielle',
        titleEn: 'Material Error Correction',
        descriptionFr: 'La rectification d\'erreur matérielle est une procédure administrative visant à corriger des erreurs dans les documents cadastraux ou fonciers.',
        descriptionEn: 'Material error correction is an administrative procedure aimed at correcting errors in cadastral or land documents.',
        duration: '2-4 mois',
        cost: '75,000 - 150,000 FCFA',
        icon: FileCheck
      },
      {
        id: 'mutation-deces',
        titleFr: 'Mutation par Décès',
        titleEn: 'Transfer by Death',
        descriptionFr: 'La mutation par décès est un processus qui permet de transférer la propriété d\'un bien foncier suite au décès de son propriétaire.',
        descriptionEn: 'Transfer by death is a process that allows transferring ownership of real estate following the death of its owner.',
        duration: '6-12 mois',
        cost: '200,000 - 400,000 FCFA',
        icon: User
      }
    ],
    technical: [
      {
        id: 'expertise-fonciere',
        titleFr: 'Expertise Foncière et Cadastrale',
        titleEn: 'Land and Cadastral Expertise',
        descriptionFr: 'Une expertise foncière et cadastrale consiste à réaliser une évaluation technique approfondie d\'une propriété foncière pour en déterminer la valeur, les caractéristiques géographiques et la conformité.',
        descriptionEn: 'Land and cadastral expertise involves conducting a thorough technical evaluation of a land property to determine its value, geographical characteristics and compliance.',
        duration: '2-4 semaines',
        cost: '100,000 - 200,000 FCFA',
        icon: Calculator
      },
      {
        id: 'etat-lieux',
        titleFr: 'État des Lieux',
        titleEn: 'Site Survey',
        descriptionFr: 'L\'état des lieux est une inspection détaillée d\'un bien foncier afin de vérifier son état physique, ses caractéristiques et les éventuelles anomalies.',
        descriptionEn: 'Site survey is a detailed inspection of real estate to verify its physical condition, characteristics and any anomalies.',
        duration: '1-2 semaines',
        cost: '50,000 - 100,000 FCFA',
        icon: Eye
      },
      {
        id: 'plan-masse',
        titleFr: 'Plan de Masse et de Situation',
        titleEn: 'Site and Location Plan',
        descriptionFr: 'Le plan de masse et de situation est un document graphique qui représente la configuration géographique d\'un terrain ou d\'un bien foncier dans son environnement immédiat.',
        descriptionEn: 'Site and location plan is a graphic document representing the geographical configuration of land or real estate in its immediate environment.',
        duration: '2-3 semaines',
        cost: '75,000 - 150,000 FCFA',
        icon: Map
      },
      {
        id: 'bornage',
        titleFr: 'Bornage',
        titleEn: 'Boundary Marking',
        descriptionFr: 'Le bornage consiste à délimiter de manière précise les limites d\'une propriété foncière à l\'aide de bornes, de repères ou de mesures géométriques.',
        descriptionEn: 'Boundary marking involves precisely delimiting the boundaries of a land property using markers, reference points or geometric measurements.',
        duration: '1-3 semaines',
        cost: '100,000 - 250,000 FCFA',
        icon: MapPin
      },
      {
        id: 'plans-cadastraux',
        titleFr: 'Réalisation de Plans Cadastraux',
        titleEn: 'Cadastral Plan Creation',
        descriptionFr: 'La réalisation de plans cadastraux implique la création de plans détaillés et géolocalisés des terrains, souvent réalisés à l\'aide de technologies modernes comme le GPS.',
        descriptionEn: 'Cadastral plan creation involves creating detailed and geolocated land plans, often made using modern technologies like GPS.',
        duration: '3-6 semaines',
        cost: '150,000 - 300,000 FCFA',
        icon: Map
      }
    ]
  };

  // Available images from public folder
  const availableImages = [
    '/IMG-20250911-WA0001.jpg',
    '/IMG-20250911-WA0002.jpg',
    '/IMG-20250911-WA0003.jpg',
    '/IMG-20250911-WA0004.jpg',
    '/IMG-20250911-WA0005.jpg',
    '/IMG-20250911-WA0006.jpg'
  ];

  const renderOverview = () => (
    <div className="space-y-16">
      {/* Department Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-8">
          <div className="w-24 h-24 bg-blue-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <MapPin className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
            {language === 'en' ? 'Land and Cadastral Management Department' : 'Département Gestion Foncière et Cadastrale'}
          </span>
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-400 to-orange-400 rounded-full mx-auto mb-8"></div>
        <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Complete expertise in land and cadastral management with specialized legal and technical services for all your real estate needs.'
            : 'Expertise complète en gestion foncière et cadastrale avec des services juridiques et techniques spécialisés pour tous vos besoins immobiliers.'
          }
        </p>
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
          <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">50+</div>
          <div className="text-blue-100">{language === 'en' ? 'Experts' : 'Experts'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Award className="w-12 h-12 text-orange-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">15+</div>
          <div className="text-blue-100">{language === 'en' ? 'Years Experience' : 'Années d\'Expérience'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">98%</div>
          <div className="text-blue-100">{language === 'en' ? 'Success Rate' : 'Taux de Succès'}</div>
        </div>
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 text-center">
          <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <div className="text-3xl font-bold text-white mb-2">1000+</div>
          <div className="text-blue-100">{language === 'en' ? 'Cases Handled' : 'Dossiers Traités'}</div>
        </div>
      </div>
    </div>
  );

  const renderProcedures = () => (
    <div className="space-y-12">
      {/* Land Procedures */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            {language === 'en' ? 'I. Land Procedures' : 'I. Procédures Foncières'}
          </span>
        </h3>
        <p className="text-blue-100 text-center mb-8 max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Land procedures are essential for registering property rights, securing land and establishing official contracts between stakeholders.'
            : 'Les procédures foncières sont essentielles pour l\'enregistrement des droits de propriété, la sécurisation des terres et la mise en place de contrats officiels entre les parties prenantes.'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landProcedures.foncier.map((procedure, index) => (
            <div key={procedure.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <procedure.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {language === 'en' ? procedure.titleEn : procedure.titleFr}
                  </h4>
                  <p className="text-blue-100 mb-4 leading-relaxed">
                    {language === 'en' ? procedure.descriptionEn : procedure.descriptionFr}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">{procedure.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-300" />
                      <span className="text-green-200">{procedure.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cadastral Procedures */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
            {language === 'en' ? 'II. Cadastral Procedures' : 'II. Procédures Cadastrales'}
          </span>
        </h3>
        <p className="text-blue-100 text-center mb-8 max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Cadastral procedures are related to the division, transfer or reconfiguration of real estate in the cadastre.'
            : 'Les procédures cadastrales sont liées à la division, au transfert ou à la reconfiguration de biens fonciers dans le cadastre.'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landProcedures.cadastral.map((procedure, index) => (
            <div key={procedure.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <procedure.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {language === 'en' ? procedure.titleEn : procedure.titleFr}
                  </h4>
                  <p className="text-blue-100 mb-4 leading-relaxed">
                    {language === 'en' ? procedure.descriptionEn : procedure.descriptionFr}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">{procedure.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-300" />
                      <span className="text-green-200">{procedure.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Administrative Procedures */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {language === 'en' ? 'III. Administrative Procedures' : 'III. Procédures Administratives'}
          </span>
        </h3>
        <p className="text-blue-100 text-center mb-8 max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Administrative procedures are necessary steps to rectify or manage land titles, particularly in case of disputes, loss or need for modification.'
            : 'Les procédures administratives sont des démarches nécessaires pour rectifier ou gérer des titres fonciers, notamment en cas de litige, de perte ou de besoin de modification.'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landProcedures.administrative.map((procedure, index) => (
            <div key={procedure.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <procedure.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {language === 'en' ? procedure.titleEn : procedure.titleFr}
                  </h4>
                  <p className="text-blue-100 mb-4 leading-relaxed">
                    {language === 'en' ? procedure.descriptionEn : procedure.descriptionFr}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">{procedure.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-300" />
                      <span className="text-green-200">{procedure.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Procedures */}
      <div>
        <h3 className="text-3xl font-bold text-white mb-8 text-center">
          <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
            {language === 'en' ? 'IV. Technical Procedures' : 'IV. Procédures Techniques'}
          </span>
        </h3>
        <p className="text-blue-100 text-center mb-8 max-w-4xl mx-auto">
          {language === 'en' 
            ? 'Technical procedures aim to guarantee the precision and validity of land documents through field studies, surveys and specialized expertise.'
            : 'Les procédures techniques visent à garantir la précision et la validité des documents fonciers à travers des études de terrain, des relevés et des expertises spécialisées.'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {landProcedures.technical.map((procedure, index) => (
            <div key={procedure.id} className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 border border-white/30 shadow-xl">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <procedure.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-white mb-2">
                    {language === 'en' ? procedure.titleEn : procedure.titleFr}
                  </h4>
                  <p className="text-blue-100 mb-4 leading-relaxed">
                    {language === 'en' ? procedure.descriptionEn : procedure.descriptionFr}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-300" />
                      <span className="text-blue-200">{procedure.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Euro className="w-4 h-4 text-green-300" />
                      <span className="text-green-200">{procedure.cost}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-12">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-8">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
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
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
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
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold">foncier@geocasagroup.com</p>
                <p className="text-blue-200 text-sm">
                  {language === 'en' ? 'Email us your questions' : 'Envoyez-nous vos questions'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
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

        {/* Quick Quote Form */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-8 border border-white/30 shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">
            {language === 'en' ? 'Quick Quote' : 'Devis Rapide'}
          </h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={language === 'en' ? 'Your Name' : 'Votre Nom'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder={language === 'en' ? 'Your Email' : 'Votre Email'}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <select className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">
                {language === 'en' ? 'Select Service' : 'Sélectionner le Service'}
              </option>
              <option value="immatriculation">
                {language === 'en' ? 'Direct Registration' : 'Immatriculation Directe'}
              </option>
              <option value="morcellement">
                {language === 'en' ? 'Subdivision' : 'Morcellement'}
              </option>
              <option value="expertise">
                {language === 'en' ? 'Land Expertise' : 'Expertise Foncière'}
              </option>
            </select>
            <textarea
              placeholder={language === 'en' ? 'Describe your project...' : 'Décrivez votre projet...'}
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300">
              {language === 'en' ? 'Request Quote' : 'Demander un Devis'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const sections = [
    { id: 'overview', label: language === 'en' ? 'Overview' : 'Aperçu', icon: Eye },
    { id: 'procedures', label: language === 'en' ? 'Procedures' : 'Procédures', icon: FileText },
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
                        ? 'bg-gradient-to-r from-blue-600 to-orange-600 text-white shadow-lg'
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
            {activeSection === 'procedures' && renderProcedures()}
            {activeSection === 'contact' && renderContact()}
          </div>

          {/* Footer */}
          <div className="text-center mt-16 text-blue-100 text-sm space-y-3">
            <div className="flex items-center justify-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Professional Excellence' : 'Excellence Professionnelle'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-medium">
                  {language === 'en' ? 'Secure Procedures' : 'Procédures Sécurisées'}
                </span>
              </div>
            </div>
            <p className="font-medium">GeoCasa Group - Département Gestion Foncière et Cadastrale</p>
            <p>Yaoundé, Cameroun • +237 6XX XXX XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GFCDepartmentDetail;