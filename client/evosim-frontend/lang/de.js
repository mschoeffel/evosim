export default {
  globalSection: {
    heading: 'Globale Details',
    selectedLanguage: 'Ausgewählte Sprache',
    populations: 'Populationen',
    creaturesPerPopulation: 'Kreaturen pro Population',
    renderTicksPerSecond: 'Darstellungsupdates pro Sekunde',
    gameTicksPerSecond: 'Spielschritte pro Sekunde',
    currentTick: 'Aktueller Tick',
  },
  statsSection: {
    headingMaxEnergy: 'Max Energie',
    headingInfo: 'Info',
    headingAvgEnergyNow: 'Avg Energie Akt.',
    headingAvgGenerationNow: 'Avg Gen. Akt.',
    headingCreaturesAlive: 'Figuren am Leben',
    headingAvgLifeNow: 'Avg Lebenszeit Akt.',
    headingAvgEnergyGen: 'Avg Energie Gen.',
    headingAvgLifetimeGen: 'Avg Lebenszeit Gen.',
    headingMaxLifetimeGen: 'Max Lebenszeit Gen.',
    population: 'Population',
    infoText:
      'Dies ist eine webbasierte Visualisierung von künstlichen neuronalen Netzen und deren Entwicklung, anhand einer vereinfachten Evolutionssimulation. Auf der Karte agieren Figuren anhand deren neuronalen Netze. Die Diagramme visualisieren die Entwicklung. Durch anklicken einer Figur kann dessen Netz und Details betrachtet werden.',
    credits: 'Bachelorarbeit Michael Schöffel',
    infoSnapshotUpload: 'Hochladen einer Snapshot JSON',
    infoSnapshotUploadDescription:
      'Wenn Sie eine Snapshot JSON haben können Sie diese hier hochladen und anzeigen lassen',
  },
  netSection: {
    inputNodeLabels: {
      x: 'X',
      y: 'Y',
      direction: 'Richtung',
      energy: 'Energie',
      energyCurrentTile: 'Energie aktuelles Feld',
      energyTileAhead: 'Energie vorraus',
    },
    outputNodeLabels: {
      rotation: 'Drehung',
      move: 'Bewegen',
      eat: 'Essen',
    },
  },
  detailSection: {
    heading: 'Kreatur Details',
    state: 'Status',
    alive: {
      true: 'Lebend',
      false: 'Verstorben',
    },
    id: 'ID',
    x: 'X-Position',
    y: 'Y-Position',
    direction: 'Richtung',
    energy: 'Energie',
    population: 'Population',
    generation: 'Generation',
    initTick: 'Erstellt mit Tick',
    ticksAlive: 'Ticks am leben',
    algorithm: 'Algorithmus',
    activation: 'Aktivierung',
  },
  topSection: {
    id: 'ID',
    topTicks: 'Top Lebenszeit',
    population: 'Population',
    headingTopPopulation: 'Top Lebenszeit je Population',
    headingTopGeneral: 'Top Lebenszeit',
    select: 'Auswählen',
  },
  manual: {
    help: 'Hilfe',
    heading: 'Anleitung',
    subtitle:
      'Wofür ist diese Anwendung nützlich? Was ist zu sehen? Was kann man damit machen?',
    summary: 'Hier ein kurzer Überblick und eine Anleitung über die Anwendung.',
    back: 'Zurück zur Anwendung geht es',
    backlink: 'hier',
    section1: {
      heading: 'Wofür wurde diese Anwendung entwickelt?',
      text1: 'EvoSim wurde im Rahmen der Bachelorarbeit zum Thema',
      quote:
        'Visualisierung künstlicher neuronaler Netze anhand einerwebbasierten, simplifizierten Evolutionssimulation',
      text2:
        'entwicklet. Hiermit soll versucht werden, mithilfe eines einfachen, gamifizierten Ansatzes, die Funktionsweise und das Lernverfahren von verschiedenen künstlichen neuronalen Netzen transparenter und konkret nachvollziehbar zu machen.',
    },
    section2: {
      heading: 'Das Szenario',
      introduction:
        'Das Szenario teilt sich in drei Komponenten und ein klares, einfaches Ziel auf:',
      subheading1: 'Die Karte',
      text1:
        'Die Karte besteht aus einzelnen Feldern. Es gibt zwei Typen von Feldern: Wasserfelder und Grasfelder. Grasfelder besitzen hierbei Nahrung bzw. Energie, welche von Figuren konsumiert werden kann über Zeit wieder nachwächst. Wasserfelder besitzen keine Energie.',
      subheading2: 'Die Figuren',
      text2:
        'Figuren gehören immer einer Population und Generation an. Eine Population gibt die Architektur und das Lernverfahren des künstlichen neuronalen Netzes für jede zugehörige Figur an. Die Generation gibt an, wie oft sich diese Population schon weiterentwickelt hat.',
      text3:
        'Figuren besitzen drei Sinne: Die aktuelle Energie der Figur, die Energie des aktuellen Feldes der Karte auf dem diese sich befinden und die Energie des Feldes voraus.',
      text4:
        'Figuren können drei Aktionen ausführen: Sich drehen, vorwärts bzw. rückwärts bewegen und Nahrung vom aktuellen Feld konsumieren. Hierbei wird dem aktuellen Feld dann die Energie abgezogen und der Figur hinzugefügt. Jede Aktion kostet der Figur Energie.',
      text5:
        'Jede Figur besitzt ein künstliches neuronales Netz, welches die Sinne der Figur interpretiert und so die Aktionen auslöst.',
      text6:
        'Bewegt sich eine Figur auf ein Wasserfeld oder besitzt keine Energie mehr stirbt diese. Sind alle Figuren einer Generation verstorben wird eine neue Generation der Population erstellt und das Lernverfahren der Population auf jede Figur bzw. dessen neuronalen Netzes angewandt.',
      subheading3: 'Ticks',
      text7:
        'Die gesamte Applikation läuft in einer Endlosschleife ab. Ein Durchgang ist hierbei ein sogenannter Tick. In jedem Tick wird dabei auf der Karte Nahrung nachwachsen gelassen. Bei jeder Figur die Sinn ausgewertet und jede Figur kann Aktionen ausführen. Ebenso wird allen Figuren eine kleine Menge Energie abgezogen.',
      subheading4: 'Ziel',
      text8:
        'Ziel des Szenarios ist es, dass die Figuren möglichst lange überleben. Also die Karte möglichst intelligent nutzen. Dazu zählt: Ausreichend Nahrung von der Karte aufnehmen, Grasfelder mit wenig Nahrung schneller passieren und Wasserfelder meiden.',
    },
    section3: {
      heading: 'Was ist zu sehen?',
      introduction:
        'Je nach Bildschirmgröße kann die Anzeige variieren. Grob ist die Anwendung in zwei Teile aufgeteilt: Die linke und die rechte Hälfte des Bildschirms.',
      subheading1: 'Linke Hälfte',
      image1: 'Visuelle Darstellung des Szenarios',
      text1:
        'Auf der linken Hälfte ist live die visuelle Darstellung des Szenarios. Hier ist die Karte mit den Gras- / Wasserfeldern und den Figuren zu sehen. Die Wasserfelder sind hierbei blau dargestellt und die Grasfelder, je nach Energie, braun bis grün. Je mehr Energie ein Grasfeld besitzt desto grüner ist es.',
      image2: 'Farbverlauf von 0 Energie zu 100 Energie',
      text2:
        'Die Figuren werden als farbige Punkte dargestellt. Jede Population besitzt hierbei eine eigene Farbe. So kann zu einer Figur die zugehörige Population direkt erkannt werden. Zudem besitzt jede Figur einen Richtungs Indikator. Dieser gibt an, in welche Richtung die Figur schaut und von welchem Feld die Energie voraus wahrgenommen wird. Abhängig von der Energie der Figur wird auch die Farbe angezeigt: Je kräftiger die Farbe einer Figur, desto mehr Energie besitzt diese. Besitzt eine Figur keine Energie mehr, also stirbt, verschwindet diese komplett von der Karte.',
      text3:
        'Die Ansicht kann mittels Klicken und Ziehen verschoben werden und per Mausrad kann hinein- bzw. herausgezoomt werden. Einzelne Figuren können hier auch per Klick an- bzw. abgewählt werden.',
      subheading2: 'Rechte Hälfte',
      image3: 'Visuelle Darstellung der Daten',
      text4:
        'Auf der rechten Hälfte werden dann jegliche Daten der Simulation und deren historischen Verläufe angezeigt. Hier lässt sich die Ansicht noch weiter unterteilen in: Links oben, rechts oben, Mitte, links Unten und rechts Unten:',
      subheading3: 'Links Oben',
      image4: 'Darstellung der Generationsdaten',
      text5:
        'Links oben sind Statistiken über die Generationen aufbereitet, um den historischen Verlauf von Generationen nachverfolgen zu können. So kann dort die durchschnittliche Lebenszeit, maximale Lebenszeit und die durchschnittliche Energie der letzten 25 Generationen einer jeden Population verglichen werden. So ist ersichtlich, ob eine Population mit jeder Generation länger lebt oder wie die unterschiedlichen Populationen sich von Generation zu Generation verändern.',
      subheading4: 'Rechts Oben',
      image5: 'Dardstellung der Livedaten',
      text6:
        'Rechts oben sind die Livedaten aufbereitet und es kann direkt verfolgt werden, wie viele Figuren bei einer Population noch leben, was die aktuelle, durchschnittliche Lebenszeit/Energie und Generation einer jeden Population ist. Hier ist erkennbar wie sich die Populationen im aktuellen Augenblick verhalten und agieren.',
      subheading5: 'Mitte',
      image6: 'Darstellung des künstlichen neuronalen Netzes',
      text7:
        'Hat man eine Figur ausgewählt wird in der Mitte live das künstliche neuronale Netz dieser angezeigt. Hierbei sind links die Sinne der Figur als Knoten dargestellt (Aktuelle Energie, Energie des aktuellen Feldes und die Energie des Feldes vor der Figur) und ganz rechts dir möglichen Aktionen der Figur (Drehen, Bewegen, Essen). Zwischen diesen fest vorgegebenen Knoten befinden sich dann je nach Architektur des Netzes verscheidene Zwischenknoten und Verbindungen, die die Eingabeinformationen dann nach rechts zu den Aktionen weitertragen bzw. manipulieren. Es kann hierbei auf jeden Knoten geklickt werden um die Gewichte der eingehenden und ausgehenden Verbindungen anzuzeigen. Je dicker die Verbindungslinie zwischen zwei Knoten, desto höher ist auch das aktuelle Gewicht dieser Verbindung. Innerhalb der Knoten wird deren aktueller Wert angezeigt. Hier kann live nachverfolgt werden, wie eine Änderung der Sinne/Eingaben, z.B. ein Wasserfeld is nun vor der Figur, direkt im künstlichen neuronalen Netz zu ggf. einer neuen Aktionen führt.',
      subheading6: 'Links Unten',
      image7: 'Darstellung von Details',
      text8:
        'Links unten sind Detaildaten in Textform ersichtlich. Eine kleine Beschreibung, die globalen Daten, wie Anzahl an Populationen, Anzahl an Ticks pro Sekunde, der aktuelle Tick der Simulation etc. sind hier zu finden. Falls eine Figur angewählt ist sind auch deren Daten aufgelistet, wie zugehörige Population, Tick der Geburt oder aktuelle Lebenszeit.',
      subheading7: 'Rechts Unten',
      image8: "Darstellung der 'besten' Figuren",
      text9:
        'Rechts unten ist ein Ranking der Figuren. Hier kann live entnommen werden, was aktuell die Figuren mit der längsten Lebenszeit sind oder was die Figur mit der längsten Lebenszeit pro Population ist. Hier können die aufgelisteten Figuren auch direkt angewählt werden.',
    },
    section4: {
      heading: 'Was ist der Nutzen?',
      text1:
        'Der primäre Nutzen dieser Anwendung soll sein, die Funktionsweise von künstlichen neuronalen Netzen einfach verständlich und transparent zu machen.',
      text2:
        'Hierfür wurde das oben beschriebene Szenario gewählt, um ein konkretes aber gleichzeitig nachvollziehbares Setting zu erhalten. Je länger eine Figur auf der Karte lebt, desto besser.',
      text3:
        'Mittels der verschiedenen Visualisierungen soll es einfach gemacht werden nachzuverfolgen, wie Figuren, bzw. Generationen oder Populationen, intelligenter werden, oder auch nicht und wie die Sinne/ Inputs einer Figur im künstlichen neuronalen Netz verarbeitet werden und zu Aktionen dieser werden.',
      text4:
        'Ebenso wurde die Applikation so entwickelt und über GitHub zur Verfügung gestellt, dass diese leicht konfigurier- und anpassbar ist und selbst verschiedenste Erweiterungen oder Anpassungen vorgenommen werden können. Denkbar wären zum Beispiel weitere Architekturen oder Lernverfahren von neuronalen Netzen hinzuzufügen und mit den bereits implementierten zu vergleichen.',
    },
    section5: {
      heading: 'Schlusswort',
      text: 'Viel Spaß mit dieser Anwendung! - Michael Schöffel',
    },
  },
};
