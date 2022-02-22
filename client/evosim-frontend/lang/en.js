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
      'What is the application useful for? What does it show? What can you do with it?',
    summary:
      'Here is a brief overview and instructions on how to use the application.',
    back: 'Go back to the application',
    backlink: 'here',
    section1: {
      heading: 'What was this application designed for?',
      text1:
        'EvoSim was developed as part of the bachelor thesis on the subject of',
      quote:
        'Visualizing artificial neural networks using a web-based, simplified evolution simulation',
      text2:
        'The aim here is to use a simple, gamified approach to make the functioning and the learning process of various artificial neural networks more transparent and precisely comprehensible.',
    },
    section2: {
      heading: 'The scenario',
      introduction:
        'The scenario breaks down into three components and a clear, simple goal.',
      subheading1: 'The map',
      text1:
        'The map consists of many individual tiles. There are two types of tiles: water tiles and grass tiles. Grass tiles have, what could be called, food or energy, which can be consumed by figures and grows back over time. Water tiles do not have energy and kill any figure that touches them.',
      subheading2: 'The figures',
      text2:
        'Figures can be thought of as characters, who move around the map and try to survive as long as possible.',
      text3:
        'In order to achieve that, they have three senses: their current energy, the energy of the tile they are currently standing on, and the energy of the tile ahead.',
      text4:
        'They also can perform three actions: turn, move forwards or backwards, and consume food from the current tile. The energy is then subtracted from the current tile and added to the figure. Over time and with each movement the figure loses energy.',
      text5:
        "Each figure has an artificial neural network that interprets the figure's senses and triggers actions based on them.",
      text6: 'Also figures always belong to a certain population and generation. A population specifies the architecture and learning method of the artificial neural network for each associated figure. The generation indicates how many times this population has evolved.',
      text7:
        'If a figure moves onto a water tile or has no more energy, it dies. If all figures of a generation have died, a new generation of the population is created and the learning process of the population is applied to each figure or to be more precise its neural network.',
      subheading3: 'Ticks',
      text8:
        "The entire application runs through an endless repetition of so-called ticks. With each tick, food is regrown on the map, each figure's senses are evaluated and each figure can perform actions. A small amount of energy is also drained from all figures. Every one million ticks the scenario is reset and the simulation starts over again.",
      subheading4: 'Goal',
      text9:
        'The goal of the scenario is for the figures to survive as long as they can. In order to do that, they need to use the map as intelligently as possible. This includes: taking enough food from the map, passing through grass fields with little energy faster and avoiding water fields.',
    },
    section3: {
      heading: 'What does it show?',
      introduction:
        'Depending on the screen size, the display may vary. For the purpose of the description the usage of a desktop monitor is assumed. On smaller devices the segments are arranged vertically instead of horizontally, as described here.',
      introduction2: 'The application is roughly divided into two parts: the visualization of the scenario and the graphic representation of the data.',
      subheading1: 'Visualization of the scenario',
      image1: 'Image example of the scenario',
      text1:
        'On the left side is the live visual representation of the scenario. Here you can see the map with the grass/water tiles and the figures. The water tiles are shown in blue and the grass tiles, depending on the energy, brown to green. The more energy a grass tile has, the greener it is.',
      image2: 'Gradient from 0 energy to 100 energy',
      text2:
        "The figures are represented as colored dots. Each population has its own color. This way, the population associated with a figure can be recognized directly. In addition, each figure has a direction indicator. This indicates in which direction the figure is looking and from which tile the energy ahead is perceived. The figure's energy is displayed by its opacity: the more opaque the color of a figure, the more energy it has. If a figure has no more energy, i.e. dies, it disappears completely from the map.",
      text3:
        'The view can be moved by clicking and dragging and you can zoom in and out with the mouse wheel. Individual figures can also be selected or deselected by clicking on them.',
      subheading2: 'Graphic representation of the data',
      image3: 'Image example graphic representation of the data',
      text4:
        'Any data from the simulation and its historical progression are displayed on the right side. Here the view can be further divided into: generation data, live data, visualisation of the artificial neural network, details and the \'best\' figures',
      subheading3: 'Representation of the generation data',
      image4: 'Image example representation of the generation data',
      text5:
        'Statistics about the generations are prepared in the top left in order to be able to trace the historical course of generations. The average lifespan, maximum lifespan and average energy of the last 25 generations of each population can be compared there. This shows, how the different populations change from generation to generation and whether e.g. a population lives longer with each generation.',
      subheading4: 'Representation of the live data',
      image5: 'Image example representation of the live data',
      text6:
        'The live data is processed at the top right and it shows up-to-date information about how many figures are still alive in a population, the current average lifetime/energy and the generation of each population. Here you can see, how the populations are behaving and acting at the current moment of the simulation.',
      subheading5: 'Representation of the artificial neural network',
      image6: 'Image example representation of the artificial neural network',
      text7:
        "If a figure is selected, the artificial neural network of this figure is displayed live in the center. The figure's senses are shown as nodes on the far left (current energy, energy of the current tile and the energy of the tile ahead) and on the far right the possible actions of the figure (turning, moving, eating) can be seen. Depending on the architecture of the network, there are various intermediate nodes and connections between these predefined nodes, which then transfer or manipulate the input information to the right and to the actions. You can click on each node to display the weights of the incoming and outgoing connections. The thicker the connecting line between two nodes, the higher the current weight of this connection is. The current value of each node is displayed inside it. Here can be followed, when a change in the senses/inputs (e.g. a water tile is now in front of the figure) leads directly to a new action in the artificial neural network.",
      subheading6: 'Representation of details',
      image7: 'Image example representation of details',
      text8:
        'Detailed data can be seen in text form at the bottom left. A small description and the global data, like number of populations, number of ticks per second, the current tick of the simulation etc. can be found here. If a figure is selected, its data is also listed, like its population, tick of birth or current lifetime.',
      subheading7: 'Representation of the \'best\' figures',
      image8: "Image example representation of the 'best' figures",
      text9:
        'On the bottom right a ranking of the figures is shown. There can be seen, which figures are the ones with the longest lifespan at the moment, or which one the figure with the longest lifespan per population is. The listed figures can also be directly selected here.',
    },
    section4: {
      heading: "What's the benefit?",
      text1:
        'The primary benefit of this application is, to make the functioning of artificial neural networks more transparent and easier to understand.',
      text2:
        'For this purpose, the scenario described above was chosen in order to obtain a concrete, but at the same time comprehensible setting: The longer a figure lives on the map, the better.',
      text3:
        'Using the various visualizations, the goal was making it easier to track, how figures, generations or populations, become more intelligent (or not) and how the senses/inputs of a figure are processed in the artificial neural network to become actions.',
      text4:
        'The application was also developed in a way, that it can be easily configured, adapted and even a wide variety of extensions or adjustments can be made. Also all the code was published via GitHub to make it easily accessible for anyone interested. For example it would be conceivable to add new architectures or learning methods for neural networks and compare them with those already implemented.',
    },
    section5: {
      heading: 'Final word',
      text: 'Have fun with this application! - Michael Schöffel',
    },
  },
};
