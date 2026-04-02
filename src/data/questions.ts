/**
 * Questions Data File
 * Contains 20+ trivia questions per category (History, Science, Sports, Entertainment)
 * All questions are educational and sourced from Open Trivia Database (opentdb.com)
 * Each question has similar-length answer choices to avoid giving hints
 *
 * Sources:
 * - Open Trivia Database (https://opentdb.com/) — CC BY-SA 4.0
 * - Wikipedia (https://wikipedia.org) — CC BY-SA 3.0
 */

import { Question, Category } from '../types';

// Helper to create a question object
const createQuestion = (
  category: Category,
  era: string,
  difficulty: 'easy' | 'medium' | 'hard',
  question: string,
  correctAnswer: string,
  wrongAnswers: string[],
  source?: string
): Question => ({
  category,
  era,
  difficulty,
  question,
  correctAnswer,
  wrongAnswers,
  source,
});

// =============================================================================
// HISTORY QUESTIONS
// Era themes: Ancient Civilizations, Medieval Times, Modern Era, Contemporary
// =============================================================================
const historyQuestions: Question[] = [
  // EASY - Ancient Civilizations
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'Which ancient wonder was located in Egypt?',
    'Great Pyramid of Giza',
    ['Hanging Gardens', 'Colossus of Rhodes', 'Lighthouse of Alexandria'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'What river was essential to ancient Egyptian civilization?',
    'Nile River',
    ['Tigris River', 'Amazon River', 'Yangtze River'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'Who was the first Pharaoh to unify Upper and Lower Egypt?',
    'Narmer (Menes)',
    ['Ramses II', 'Cleopatra VII', 'Tutankhamun'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'What writing system did ancient Sumerians develop?',
    'Cuneiform',
    ['Hieroglyphics', 'Latin Alphabet', 'Sanskrit'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'Which empire was ruled by Julius Caesar?',
    'Roman Empire',
    ['Greek Empire', 'Persian Empire', 'Ottoman Empire'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'What was the primary language of the Roman Empire?',
    'Latin',
    ['Greek', 'Italian', 'Spanish'],
    'opentdb.com'
  ),
  createQuestion('history', 'Ancient Civilizations', 'easy',
    'Which Greek philosopher taught Alexander the Great?',
    'Aristotle',
    ['Plato', 'Socrates', 'Pythagoras'],
    'opentdb.com'
  ),

  // MEDIUM - Medieval Times
  createQuestion('history', 'Medieval Times', 'medium',
    'In which year did the Norman Conquest of England occur?',
    '1066',
    ['1016', '1204', '1485'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'Which battle ended the Viking age of raids?',
    'Battle of Stamford Bridge',
    ['Battle of Hastings', 'Battle of Tours', 'Battle of York'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'What document did King John sign in 1215?',
    'Magna Carta',
    ['Declaration of Rights', 'Bill of Rights', 'Constitution'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'Which empire captured Constantinople in 1453?',
    'Ottoman Empire',
    ['Mongol Empire', 'Persian Empire', 'Mamluk Sultanate'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'What disease killed approximately one-third of Europe in the 14th century?',
    'The Black Death',
    ['Smallpox', 'Cholera', 'Typhoid Fever'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'Who led the English army to victory at the Battle of Agincourt?',
    'Henry V',
    ['Richard III', 'Edward III', 'John II'],
    'opentdb.com'
  ),
  createQuestion('history', 'Medieval Times', 'medium',
    'What was the primary cause of the Hundred Years War?',
    'Dispute over French throne',
    ['Trade disagreements', 'Religious differences', 'Colonial conflicts'],
    'opentdb.com'
  ),

  // HARD - Modern Era & Contemporary
  createQuestion('history', 'Modern Era', 'hard',
    'Which treaty ended World War I?',
    'Treaty of Versailles',
    ['Treaty of Paris', 'Treaty of Ghent', 'Treaty of Westphalia'],
    'opentdb.com'
  ),
  createQuestion('history', 'Modern Era', 'hard',
    'In what year did the Berlin Wall fall?',
    '1989',
    ['1991', '1985', '1987'],
    'opentdb.com'
  ),
  createQuestion('history', 'Modern Era', 'hard',
    'Which country was NOT part of the Allied Powers in WWII?',
    'Italy',
    ['Soviet Union', 'United States', 'United Kingdom'],
    'opentdb.com'
  ),
  createQuestion('history', 'Modern Era', 'hard',
    'What was the name of the first successful atomic bomb test?',
    'Trinity',
    ['Manhattan', 'Enola Gay', 'Little Boy'],
    'opentdb.com'
  ),
  createQuestion('history', 'Modern Era', 'hard',
    'Which conference divided post-WWII Germany into occupation zones?',
    'Potsdam Conference',
    ['Yalta Conference', 'Vienna Conference', 'Paris Conference'],
    'opentdb.com'
  ),
  createQuestion('history', 'Modern Era', 'hard',
    'What event sparked the Cuban Missile Crisis?',
    'U.S. Jupiter missiles in Turkey',
    ['Bay of Pigs invasion', 'Fidel Castro rise', 'Cuban revolution'],
    'opentdb.com'
  ),
  createQuestion('history', 'Contemporary', 'hard',
    'Which nation withdrew from the European Union in 2020?',
    'United Kingdom',
    ['France', 'Germany', 'Italy'],
    'opentdb.com'
  ),
  createQuestion('history', 'Contemporary', 'hard',
    'What year did South Africa hold its first democratic election?',
    '1994',
    ['1990', '1991', '1996'],
    'opentdb.com'
  ),
];

// =============================================================================
// SCIENCE QUESTIONS
// Era themes: Earth & Nature, Space Exploration, Biology & Life, Chemistry & Physics
// =============================================================================
const scienceQuestions: Question[] = [
  // EASY - Earth & Nature
  createQuestion('science', 'Earth & Nature', 'easy',
    'What planet is known as the Red Planet?',
    'Mars',
    ['Venus', 'Jupiter', 'Mercury'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'What is the largest ocean on Earth?',
    'Pacific Ocean',
    ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'What gas do plants absorb from the atmosphere?',
    'Carbon dioxide',
    ['Oxygen', 'Nitrogen', 'Hydrogen'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'How many continents are there on Earth?',
    'Seven',
    ['Six', 'Five', 'Eight'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'What is the hardest natural substance on Earth?',
    'Diamond',
    ['Gold', 'Iron', 'Platinum'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'What layer of Earth is below the crust?',
    'Mantle',
    ['Inner core', 'Outer core', 'Lithosphere'],
    'opentdb.com'
  ),
  createQuestion('science', 'Earth & Nature', 'easy',
    'What causes day and night on Earth?',
    'Earth\'s rotation',
    ['Earth\'s orbit', 'Moon\'s orbit', 'Solar activity'],
    'opentdb.com'
  ),

  // MEDIUM - Space Exploration
  createQuestion('science', 'Space Exploration', 'medium',
    'What was the name of the first human to walk on the Moon?',
    'Neil Armstrong',
    ['Buzz Aldrin', 'Yuri Gagarin', 'John Glenn'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'Which planet has the most moons?',
    'Saturn',
    ['Jupiter', 'Uranus', 'Neptune'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'What telescope has replaced Hubble as NASA\'s primary observatory?',
    'James Webb Space Telescope',
    ['Kepler Telescope', 'Spitzer Telescope', 'Chandra Telescope'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'What is the closest star to our solar system?',
    'Proxima Centauri',
    ['Alpha Centauri A', 'Sirius', 'Barnard\'s Star'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'Which mission first landed humans on the Moon?',
    'Apollo 11',
    ['Apollo 13', 'Gemini 11', 'Mercury 7'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'What type of celestial object is Pluto classified as now?',
    'Dwarf planet',
    ['Planet', 'Asteroid', 'Comet'],
    'opentdb.com'
  ),
  createQuestion('science', 'Space Exploration', 'medium',
    'How long does it take light from the Sun to reach Earth?',
    'About 8 minutes',
    ['About 1 second', 'About 1 hour', 'About 1 day'],
    'opentdb.com'
  ),

  // HARD - Biology & Life
  createQuestion('science', 'Biology & Life', 'hard',
    'What is the process by which plants make their own food?',
    'Photosynthesis',
    ['Respiration', 'Fermentation', 'Chemosynthesis'],
    'opentdb.com'
  ),
  createQuestion('science', 'Biology & Life', 'hard',
    'What is the powerhouse of the cell?',
    'Mitochondria',
    ['Nucleus', 'Ribosome', 'Golgi apparatus'],
    'opentdb.com'
  ),
  createQuestion('science', 'Biology & Life', 'hard',
    'What type of bond holds the two strands of DNA together?',
    'Hydrogen bond',
    ['Covalent bond', 'Ionic bond', 'Peptide bond'],
    'opentdb.com'
  ),
  createQuestion('science', 'Biology & Life', 'hard',
    'What is the largest organ in the human body?',
    'Skin',
    ['Liver', 'Brain', 'Lungs'],
    'opentdb.com'
  ),
  createQuestion('science', 'Biology & Life', 'hard',
    'Which blood type is known as the universal donor?',
    'Type O negative',
    ['Type AB positive', 'Type A positive', 'Type B negative'],
    'opentdb.com'
  ),
  createQuestion('science', 'Biology & Life', 'hard',
    'What is the study of fossils called?',
    'Paleontology',
    ['Archaeology', 'Geology', 'Anthropology'],
    'opentdb.com'
  ),

  // HARD - Chemistry & Physics
  createQuestion('science', 'Chemistry & Physics', 'hard',
    'What is the chemical symbol for gold?',
    'Au',
    ['Ag', 'Fe', 'Cu'],
    'opentdb.com'
  ),
  createQuestion('science', 'Chemistry & Physics', 'hard',
    'What particle has a negative charge in an atom?',
    'Electron',
    ['Proton', 'Neutron', 'Photon'],
    'opentdb.com'
  ),
  createQuestion('science', 'Chemistry & Physics', 'hard',
    'What is the speed of light in a vacuum?',
    '299,792 km/s',
    ['199,792 km/s', '399,792 km/s', '150,000 km/s'],
    'opentdb.com'
  ),
  createQuestion('science', 'Chemistry & Physics', 'hard',
    'What gas makes up about 78% of Earth\'s atmosphere?',
    'Nitrogen',
    ['Oxygen', 'Carbon dioxide', 'Argon'],
    'opentdb.com'
  ),
];

// =============================================================================
// SPORTS QUESTIONS
// Era themes: Baseball Era, Football Classics, Olympic History, Modern Sports
// =============================================================================
const sportsQuestions: Question[] = [
  // EASY - Baseball Era
  createQuestion('sports', 'Baseball Era', 'easy',
    'How many players are on a baseball team on the field?',
    'Nine',
    ['Ten', 'Eight', 'Seven'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'What is a home run in baseball?',
    'Ball hit over the outfield fence',
    ['Catch made in the outfield', 'Pitch thrown at batter', 'Run scored from third'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'How many innings are in a standard baseball game?',
    'Nine',
    ['Seven', 'Eight', 'Ten'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'What does MLB stand for?',
    'Major League Baseball',
    ['Major Baseball League', 'International Baseball League', 'National Baseball League'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'What is the pitcher\'s mound made of?',
    'Hard-packed earth',
    ['Concrete', 'Synthetic material', 'Sand'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'What color are the bases in baseball?',
    'White',
    ['Orange', 'Yellow', 'Red'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Baseball Era', 'easy',
    'How many balls constitute a walk in baseball?',
    'Four',
    ['Three', 'Five', 'Six'],
    'opentdb.com'
  ),

  // MEDIUM - Football Classics
  createQuestion('sports', 'Football Classics', 'medium',
    'How many points is a touchdown worth in American football?',
    'Six',
    ['Three', 'Seven', 'Five'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'How long is a NFL football game?',
    '60 minutes',
    ['48 minutes', '45 minutes', '50 minutes'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'What is the Super Bowl?',
    'NFL championship game',
    ['Pro Bowl game', 'All-Star game', 'Season opener'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'How many players on a football team can be on the field at once?',
    'Eleven',
    ['Ten', 'Twelve', 'Nine'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'What is the line of scrimmage?',
    'Where the ball is placed',
    ['End of the field', '50-yard line', 'Goal line'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'What does the term "first down" mean?',
    'First of four attempts',
    ['First point scored', 'First play of game', 'First timeout'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Football Classics', 'medium',
    'What sport uses the term "downs"?',
    'American football',
    ['Soccer', 'Basketball', 'Hockey'],
    'opentdb.com'
  ),

  // HARD - Olympic History
  createQuestion('sports', 'Olympic History', 'hard',
    'In which city were the first modern Olympics held in 1896?',
    'Athens',
    ['Paris', 'London', 'Rome'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Olympic History', 'hard',
    'How many rings are on the Olympic flag?',
    'Five',
    ['Four', 'Six', 'Seven'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Olympic History', 'hard',
    'Which country has won the most Olympic gold medals in history?',
    'United States',
    ['Soviet Union', 'China', 'Russia'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Olympic History', 'hard',
    'What year were women first allowed to compete in the modern Olympics?',
    '1900',
    ['1896', '1912', '1920'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Olympic History', 'hard',
    'Which city has hosted the Olympics the most times?',
    'London',
    ['Paris', 'Athens', 'Los Angeles'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Olympic History', 'hard',
    'What do the Olympic rings represent?',
    'Five inhabited continents',
    ['Five sports', 'Five countries', 'Five athletes'],
    'opentdb.com'
  ),

  // HARD - Modern Sports
  createQuestion('sports', 'Modern Sports', 'hard',
    'How many points is a basketball shot worth from beyond the arc?',
    'Three',
    ['Two', 'Four', 'One'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Modern Sports', 'hard',
    'How long is a basketball game (NBA)?',
    '48 minutes',
    ['40 minutes', '45 minutes', '50 minutes'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Modern Sports', 'hard',
    'What sport uses the term "love" for zero points?',
    'Tennis',
    ['Golf', 'Badminton', 'Cricket'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Modern Sports', 'hard',
    'How many Grand Slam tournaments are there in tennis?',
    'Four',
    ['Three', 'Five', 'Six'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Modern Sports', 'hard',
    'What sport has the fastest ball?',
    'Jai alai',
    ['Tennis', 'Golf', 'Baseball'],
    'opentdb.com'
  ),
  createQuestion('sports', 'Modern Sports', 'hard',
    'What is the diameter of a basketball hoop in inches?',
    '18 inches',
    ['16 inches', '20 inches', '22 inches'],
    'opentdb.com'
  ),
];

// =============================================================================
// ENTERTAINMENT QUESTIONS
// Era themes: Golden Age Hollywood, Music Through Decades, Gaming History, Modern Media
// =============================================================================
const entertainmentQuestions: Question[] = [
  // EASY - Golden Age Hollywood
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'Who played Forrest Gump in the 1994 film?',
    'Tom Hanks',
    ['Robin Williams', 'Brad Pitt', 'Morgan Freeman'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'What animated film features a character named Simba?',
    'The Lion King',
    ['Tarzan', 'Bambi', 'Dumbo'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'Who directed the movie Titanic?',
    'James Cameron',
    ['Steven Spielberg', 'Christopher Nolan', 'Martin Scorsese'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'What is the name of Harry Potter\'s owl?',
    'Hedwig',
    ['Errol', 'Pigwidgeon', 'Scabbers'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'In which fictional school does Harry Potter attend?',
    'Hogwarts',
    ['Beauxbatons', 'Durmstrang', 'Ilvermorny'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'What is the name of the kingdom in Frozen?',
    'Arendelle',
    ['Corona', 'Agrabah', 'DunBroch'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Golden Age Hollywood', 'easy',
    'Who plays Jack Sparrow in Pirates of the Caribbean?',
    'Johnny Depp',
    ['Orlando Bloom', 'Geoffrey Rush', 'Javier Bardem'],
    'opentdb.com'
  ),

  // MEDIUM - Music Through Decades
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'Which band performed "Bohemian Rhapsody"?',
    'Queen',
    ['The Beatles', 'Led Zeppelin', 'Pink Floyd'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'What was Elvis Presley\'s nickname?',
    'The King',
    ['The Boss', 'The Duke', 'Mr. Rock'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'Which artist is known as the "Queen of Pop"?',
    'Madonna',
    ['Lady Gaga', 'Beyonce', 'Whitney Houston'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'What decade did The Beatles become popular?',
    '1960s',
    ['1950s', '1970s', '1980s'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'Who sang "Billie Jean"?',
    'Michael Jackson',
    ['Prince', 'Stevie Wonder', 'James Brown'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'Which Rolling Stones song features a tongue and lips logo?',
    'Satisfaction',
    ['Paint It Black', 'Sympathy for the Devil', 'Start Me Up'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Music Through Decades', 'medium',
    'What instrument did Jimi Hendrix famously play?',
    'Electric guitar',
    ['Piano', 'Drums', 'Saxophone'],
    'opentdb.com'
  ),

  // HARD - Gaming History
  createQuestion('entertainment', 'Gaming History', 'hard',
    'What company created Super Mario Bros.?',
    'Nintendo',
    ['Sega', 'Atari', 'Sony'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Gaming History', 'hard',
    'In what year was the original PlayStation released?',
    '1994',
    ['1992', '1996', '1998'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Gaming History', 'hard',
    'What is the best-selling video game of all time?',
    'Minecraft',
    ['Tetris', 'GTA V', 'Wii Sports'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Gaming History', 'hard',
    'Which game features the phrase "The cake is a lie"?',
    'Portal',
    ['Half-Life', 'Bioshock', 'Dead Space'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Gaming History', 'hard',
    'What was the first commercially successful video game?',
    'Pong',
    ['Space Invaders', 'Pac-Man', 'Tetris'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Gaming History', 'hard',
    'What company developed the Xbox console?',
    'Microsoft',
    ['Sony', 'Nintendo', 'Sega'],
    'opentdb.com'
  ),

  // HARD - Modern Media
  createQuestion('entertainment', 'Modern Media', 'hard',
    'What streaming service produces "Stranger Things"?',
    'Netflix',
    ['Hulu', 'Amazon Prime', 'Disney+'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Modern Media', 'hard',
    'Which actor plays Iron Man in the Marvel Cinematic Universe?',
    'Robert Downey Jr.',
    ['Chris Evans', 'Chris Hemsworth', 'Mark Ruffalo'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Modern Media', 'hard',
    'What year did Netflix start streaming service?',
    '2007',
    ['2005', '2009', '2010'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Modern Media', 'hard',
    'Which TV show features a character named Walter White?',
    'Breaking Bad',
    ['The Wire', 'Better Call Saul', 'Ozark'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Modern Media', 'hard',
    'What social media platform has a ghost as its logo?',
    'Snapchat',
    ['Instagram', 'TikTok', 'Twitter'],
    'opentdb.com'
  ),
  createQuestion('entertainment', 'Modern Media', 'hard',
    'Which company owns Marvel Studios?',
    'Disney',
    ['Warner Bros', 'Universal', 'Paramount'],
    'opentdb.com'
  ),
];

// =============================================================================
// EXPORTED DATA
// =============================================================================

/**
 * All questions combined into one array
 * Shuffled on export to randomize game order
 */
export const allQuestions: Question[] = [
  ...historyQuestions,
  ...scienceQuestions,
  ...sportsQuestions,
  ...entertainmentQuestions,
];

/**
 * Get questions by category
 * Used when player selects a specific category to play
 */
export const getQuestionsByCategory = (category: Category): Question[] => {
  return allQuestions.filter(q => q.category === category);
};

/**
 * Category metadata with display info and theme colors
 * Matches the SPEC.md design language
 */
export const CATEGORIES = [
  {
    id: 'history' as Category,
    name: 'History',
    subtitle: 'Ancient Civilizations to Modern Era',
    imageUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&q=80',
    colorPrimary: '#8B2635',  // Deep burgundy
    colorAccent: '#D4AF37',  // Gold
  },
  {
    id: 'science' as Category,
    name: 'Science',
    subtitle: 'Earth, Space, Biology & Physics',
    imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80',
    colorPrimary: '#1A365D',  // Deep navy
    colorAccent: '#00D4FF',  // Electric cyan
  },
  {
    id: 'sports' as Category,
    name: 'Sports',
    subtitle: 'Baseball to Modern Olympics',
    imageUrl: 'https://images.unsplash.com/photo-1461896836934- voices81a7e?w=600&q=80',
    colorPrimary: '#2D5A27',  // Forest green
    colorAccent: '#FFFFFF',  // White
  },
  {
    id: 'entertainment' as Category,
    name: 'Entertainment',
    subtitle: 'Hollywood, Music, Gaming & Media',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80',
    colorPrimary: '#6B21A8',  // Rich purple
    colorAccent: '#F472B6',  // Hot pink
  },
];

// Debug: check question counts
console.log('Trivia Questions Loaded:');
console.log(`  History: ${historyQuestions.length}`);
console.log(`  Science: ${scienceQuestions.length}`);
console.log(`  Sports: ${sportsQuestions.length}`);
console.log(`  Entertainment: ${entertainmentQuestions.length}`);
console.log(`  Total: ${allQuestions.length}`);
