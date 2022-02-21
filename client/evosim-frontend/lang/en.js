export default {
  globalSection: {
    heading: 'Global Details',
    selectedLanguage: 'Selected Language',
    populations: 'Populations',
    figuresPerPopulation: 'Figures per population',
    renderTicksPerSecond: 'Renderings per second',
    gameTicksPerSecond: 'Gamesteps per second',
    currentTick: 'Current Tick',
  },
  statsSection: {
    headingMaxEnergy: 'Max Energy',
    headingInfo: 'Info',
    headingAvgEnergyNow: 'Avg Energy Now',
    headingFiguresAlive: 'Figures Alive',
    headingAvgGenerationNow: 'Avg Gen. Now',
    headingAvgLifeNow: 'Avg Lifetime Now',
    headingAvgEnergyGen: 'Avg Energy Generations',
    headingAvgLifetimeGen: 'Avg Lifetime Generations',
    headingMaxLifetimeGen: 'Max Lifetime Generations',
    population: 'Population',
    infoText:
      'This is a web based visualization of artificial neural networks and their learning process, based on a simplified evolution simulation. On the map figures are acting according to their neural net. The diagrams show the development over time. By clicking on a figure you can see their net and details.',
    credits: 'Bachelor Thesis Michael Schöffel',
    infoSnapshotUpload: 'Upload a Snapshot JSON',
    infoSnapshotUploadDescription:
      'If you have a Snapshot JSON you can upload to display it here',
  },
  netSection: {
    inputNodeLabels: {
      x: 'X',
      y: 'Y',
      direction: 'Direction',
      energy: 'Energy',
      energyCurrentTile: 'Energy current Tile',
      energyTileAhead: 'Energy Tile ahead',
    },
    outputNodeLabels: {
      rotation: 'Rotation',
      move: 'Move',
      eat: 'Eat',
    },
  },
  detailSection: {
    heading: 'Figure Details',
    state: 'State',
    alive: {
      true: 'Alive',
      false: 'Dead',
    },
    id: 'ID',
    x: 'X-Position',
    y: 'Y-Position',
    direction: 'Direction',
    energy: 'Energy',
    population: 'Population',
    generation: 'Generation',
    initTick: 'Generated at Tick',
    ticksAlive: 'Ticks alive',
    algorithm: 'Algorithm',
    activation: 'Activation',
  },
  topSection: {
    id: 'ID',
    topTicks: 'Top Lifetime',
    population: 'Population',
    headingTopPopulation: 'Top Lifetime per Population',
    headingTopGeneral: 'Top Lifetime',
    select: 'Select',
  },
  manual: {
    help: 'Help',
    heading: 'Manual',
    subtitle:
      'What is the application useful for? What to see? What can you do with it?',
    summary:
      'Here is a brief overview and instructions on how to use the application.',
    back: 'Go back to the application',
    backlink: 'here',
    section1: {
      heading: 'What was this application designed for?',
      text1:
        'EvoSim was developed as part of the bachelor thesis on the subject of',
      quote:
        'Visualizing artificial neural networks using a web-based, simplified evolution simulation.',
      text2:
        'The aim here is to use a simple, gamified approach to make the functioning and the learning process of various artificial neural networks more transparent and concretely comprehensible.',
    },
    section2: {
      heading: 'The szenario',
      introduction:
        'The scenario breaks down into three components and a clear, simple goal:',
      subheading1: 'The map',
      text1:
        'The map consists of individual spaces. There are two types of spaces: water spaces and grass spaces. Grass spaces have food or energy, which can be consumed by characters and grows back over time. Water spaces have no energy.',
      subheading2: 'The characters',
      text2:
        'Characters always belong to a population and generation. A population specifies the architecture and learning method of the artificial neural network for each associated character. The generation indicates how many times this population has evolved.',
      text3:
        'Characters have three senses: the current energy of the character, the energy of the current space of the map they are on, and the energy of the space ahead.',
      text4:
        'Figures can perform three actions: turn, move forward or backward, and consume food from the current space. The energy is then subtracted from the current space and added to the figure. Each action costs the character energy.',
      text5:
        "Each character has an artificial neural network that interprets the character's senses and thus triggers the actions.",
      text6:
        'If a character moves onto a water space or has no more energy, it dies. If all figures of a generation have died, a new generation of the population is created and the learning process of the population is applied to each figure or its neural network.',
      subheading3: 'Ticks',
      text7:
        "The entire application runs in an endless loop. One pass is a so-called tick. With each tick, food is regrown on the map. Each character's senses are evaluated and each character can perform actions. A small amount of energy is also drained from all characters.",
      subheading4: 'Goal',
      text8:
        'The goal of the scenario is for the characters to survive as long as possible. So they need to use the map as intelligently as possible. This includes: taking enough food from the map, passing through grass fields with little food faster and avoiding water fields.',
    },
    section3: {
      heading: 'What to see?',
      introduction:
        'Depending on the screen size, the display may vary. The application is roughly divided into two parts: the left and right half of the screen.',
      subheading1: 'Left side',
      image1: 'Visual representation of the scenario',
      text1:
        'On the left side is the live visual representation of the scenario. Here you can see the map with the grass/water spaces and the characters. The water spaces are shown in blue and the grass spaces, depending on the energy, brown to green. The more energy a grass space has, the greener it is.',
      image2: 'Gradient from 0 energy to 100 energy',
      text2:
        "The characters are represented as colored dots. Each population has its own color. In this way, the population associated with a character can be recognized directly. In addition, each character has a direction indicator. This indicates in which direction the character is looking and from which space the energy ahead is perceived. Depending on the character's energy, the color is also displayed: the stronger the color of a character, the more energy it has. If a character has no more energy, i.e. dies, it disappears completely from the map.",
      text3:
        'The view can be moved by clicking and dragging and you can zoom in and out with the mouse wheel. Individual characters can also be selected or deselected by clicking on them.',
      subheading2: 'Right side',
      image3: 'Visual representation of the data',
      text4:
        'Any data from the simulation and its historical progression are then displayed on the right side. Here the view can be divided further into: top left, top right, center, bottom left and bottom right:',
      subheading3: 'Top left',
      image4: 'Representation of the generation data',
      text5:
        'Statistics about the generations are prepared in the top left in order to be able to trace the historical course of generations. The average lifespan, maximum lifespan and average energy of the last 25 generations of each population can be compared there. This shows whether a population lives longer with each generation or how the different populations change from generation to generation.',
      subheading4: 'Top right',
      image5: 'Representation of the live data',
      text6:
        'The live data is processed at the top right and it can be followed directly how many figures are still alive in a population, what the current, average lifetime/energy and generation of each population is. Here you can see how the populations are behaving and acting at the current moment of the simulation.',
      subheading5: 'Center',
      image6: 'Representation of the artificial neural network',
      text7:
        "If you have selected a character, the artificial neural network of this figure is displayed live in the center. The character's senses are shown as nodes on the left (current energy, energy of the current space and the energy of the space ahead of the figure) and on the far right you can see the possible actions of the figure (turning, moving, eating). Depending on the architecture of the network, there are various intermediate nodes and connections between these fixed nodes, which then transfer or manipulate the input information to the right and to the actions. You can click on each node to display the weights of the incoming and outgoing connections. The thicker the connecting line between two nodes, the higher the current weight of this connection. The current value of each node is displayed within. Here you can follow live how a change in the senses/inputs, e.g. a water space is now in front of the character, leads directly to a new action in the artificial neural network.",
      subheading6: 'Bottom left',
      image7: 'Representation of details',
      text8:
        'Detailed data can be seen in text form at the bottom left. A small description, the global data, like number of populations, number of ticks per second, the current tick of the simulation etc. can be found here. If a character is selected, its data is also listed, like its population, tick of birth or current lifetime.',
      subheading7: 'Bottom right',
      image8: "Representation of the 'best' characters",
      text9:
        'On the bottom right is a ranking of the figures. Here you can see live what the characters with the longest lifespan are at the moment or what the character with the longest lifespan per population is. The listed figures can also be selected directly here.',
    },
    section4: {
      heading: "What's the benefit?",
      text1:
        'The primary benefit of this application is to make the functioning of artificial neural networks transparent and easy to understand.',
      text2:
        'For this purpose, the scenario described above was chosen in order to obtain a concrete but at the same time comprehensible setting. The longer a character lives on the map, the better.',
      text3:
        'Using the various visualizations, it should be made easy to track how characters, generations or populations, become more intelligent or not and how the senses/ inputs of a character are processed in the artificial neural network and become actions of this.',
      text4:
        'The application was also developed and made available via GitHub in such a way that it can be easily configured, adapted and even a wide variety of extensions or adjustments can be made. It would be conceivable, for example, to add new architectures or learning methods for neural networks and compare them with those already implemented.',
    },
    section5: {
      heading: 'Final word',
      text: 'Have fun with this application! - Michael Schöffel',
    },
  },
};
