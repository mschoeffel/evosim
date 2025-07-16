export default {
  globalSection: {
    heading: 'Globale Details',
    selectedLanguage: 'Ausgewählte Sprache',
    populations: 'Populationen',
    figuresPerPopulation: 'Figuren pro Population',
    renderTicksPerSecond: 'Darstellungsupdates pro Sekunde',
    gameTicksPerSecond: 'Spielschritte pro Sekunde',
    currentTick: 'Aktueller Tick',
  },
  statsSection: {
    headingMaxEnergy: 'Max Energie',
    headingInfo: 'Info',
    headingAvgEnergyNow: 'Avg Energie Akt.',
    headingAvgGenerationNow: 'Avg Gen. Akt.',
    headingFiguresAlive: 'Figuren am Leben',
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
      energyTileAhead: 'Energie voraus',
      waterAhead: 'Wasser voraus',
    },
    outputNodeLabels: {
      rotation: 'Drehung',
      move: 'Bewegen',
      eat: 'Essen',
    },
  },
  detailSection: {
    heading: 'Figur Details',
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
    ticksAlive: 'Ticks am Leben',
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
    help: 'Hilfe & Infos',
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
        'Visualisierung künstlicher neuronaler Netze anhand einer webbasierten, simplifizierten Evolutionssimulation',
      text2:
        'entwicklet. Hiermit soll versucht werden, mithilfe eines einfachen, gamifizierten Ansatzes, die Funktionsweise und das Lernverfahren von verschiedenen künstlichen neuronalen Netzen transparenter und konkret nachvollziehbar zu machen.',
    },
    section2: {
      heading: 'Das Szenario',
      introduction:
        'Das Szenario teilt sich in drei Komponenten und ein klares, einfaches Ziel auf.',
      subheading1: 'Die Karte',
      text1:
        'Die Karte besteht aus vielen einzelnen Feldern. Es gibt zwei Typen von Feldern: Wasserfelder und Grasfelder. Grasfelder besitzen hierbei Nahrung bzw. Energie, welche von Figuren konsumiert werden kann und über Zeit wieder nachwächst. Wasserfelder besitzen keine Energie und töten jede Figur, die sie berührt.',
      subheading2: 'Die Figuren',
      text2:
        'Unter den Figuren kann man sich Charaktere vorstellen, welche sich über die Karte bewegen und deren Ziel es ist, so lange wie möglich zu überleben.',
      text3:
        'Um das zu erreichen besitzen sie drei Sinne: ihre aktuelle Energie, die Energie des Feldes auf dem sie sich gerade befinden und die Energie des Feldes voraus.',
      text4:
        'Außderdem können sie drei Aktionen ausführen: sich drehen, vorwärts bzw. rückwärts bewegen und Nahrung vom aktuellen Feld konsumieren. Hierbei wird dem aktuellen Feld dann die Energie abgezogen und der Figur hinzugefügt. Über Zeit und mit jeder Bewegung verliert die Figur Energie.',
      text5:
        'Jede Figur besitzt ein künstliches neuronales Netz, welches die Sinne der Figur interpretiert und basierend darauf die Aktionen auslöst.',
      text6: 'Zudem gehören Figuren immer einer bestimmten Population und Generation an. Eine Population gibt die Architektur und das Lernverfahren des künstlichen neuronalen Netzes für jede zugehörige Figur an. Die Generation gibt an, wie oft sich diese Population schon weiterentwickelt hat.',
      text7:
        'Bewegt sich eine Figur auf ein Wasserfeld oder besitzt keine Energie mehr stirbt diese. Sind alle Figuren einer Generation verstorben wird eine neue Generation der Population erstellt und das Lernverfahren der Population auf jede Figur oder genauer ihr neuronales Netz angewandt.',
      subheading3: 'Ticks',
      text8:
        'Die gesamte Applikation läuft in einer endlosen Wiederholung sogenannter Ticks ab. Mit jedem Tick wird hierbei auf der Karte Nahrung wiederhergestellt, bei jeder Figur die Sinn ausgewertet und jede Figur kann Aktionen ausführen. Ebenso wird allen Figuren eine kleine Menge Energie abgezogen. Nach einer Million Ticks wird das Szenario zurückgesetzt und die Simulation startet von neuem.',
      subheading4: 'Ziel',
      text9:
        'Ziel des Szenarios ist es, dass die Figuren möglichst lange überleben, also die Karte möglichst intelligent nutzen. Dazu zählt: ausreichend Nahrung von der Karte aufnehmen, Grasfelder mit wenig Energie schneller passieren und Wasserfelder meiden.',
    },
    section3: {
      heading: 'Was ist zu sehen?',
      introduction:
        'Je nach Bildschirmgröße kann die Anzeige variieren. Im Folgenden wird bezüglich der Anordnung die Nutzung eines Desktop Bildschirms angenommen. Auf kleineren Geräten erfolgt die Anordnung untereinander, statt wie hier beschrieben nebeneinander.',
      introduction2: 'Grob ist die Anwendung in zwei Teile aufgeteilt: die Visualisierung des Szenarios und die grafische Darstellung der Daten.',
      subheading1: 'Visualisierung des Szenarios',
      image1: 'Beispielbild Szenario',
      text1:
        'Auf der linken Hälfte ist live die visuelle Darstellung des Szenarios. Hier ist die Karte mit den Gras- / Wasserfeldern und den Figuren zu sehen. Die Wasserfelder sind hierbei blau dargestellt und die Grasfelder, je nach Energie, braun bis grün. Je mehr Energie ein Grasfeld besitzt, desto grüner ist es.',
      image2: 'Farbverlauf von 0 Energie zu 100 Energie',
      text2:
        'Die Figuren werden als farbige Punkte dargestellt. Jede Population besitzt hierbei eine eigene Farbe. So kann die Population, zu der eine Figur gehört, direkt erkannt werden. Zudem besitzt jede Figur einen Richtungsindikator, der angibt, in welche Richtung die Figur schaut und von welchem Feld voraus die Energie wahrgenommen wird. Abhängig von der Energie der Figur wird auch die Farbe angezeigt: Je kräftiger die Farbe einer Figur, desto mehr Energie besitzt diese. Hat eine Figur keine Energie mehr, ist also tot, verschwindet sie komplett von der Karte.',
      text3:
        'Die Ansicht kann mittels Klicken und Ziehen verschoben werden und per Mausrad kann hinein- und herausgezoomt werden. Einzelne Figuren können hier per Klick an- bzw. abgewählt werden.',
      subheading2: 'Grafische Darstellung der Daten',
      image3: 'Beispielbild grafische Darstellung der Daten',
      text4:
        'Auf der rechten Hälfte werden Daten der Simulation und deren historischen Verläufe angezeigt. Hier lässt sich die Ansicht noch weiter unterteilen in: Generationsdaten, Livedaten, Darstellung des künstlichen neuronalen Netzes, Details und die \'besten\' Figuren:',
      subheading3: 'Darstellung der Generationsdaten',
      image4: 'Beispielbild Darstellung der Generationsdaten',
      text5:
        'Links oben sind Statistiken über die Generationen aufbereitet, um den historischen Verlauf von Generationen nachverfolgen zu können. So kann dort die durchschnittliche Lebenszeit, die maximale Lebenszeit und die durchschnittliche Energie der letzten 25 Generationen jeder Population verglichen werden. So ist ersichtlich, wie die unterschiedlichen Populationen sich von Generation zu Generation verändern und ob beispielsweise eine Population mit jeder Generation länger lebt.',
      subheading4: 'Darstellung der Livedaten',
      image5: 'Beispielbild Darstellung der Livedaten',
      text6:
        'Rechts oben sind die Livedaten aufbereitet und es kann direkt verfolgt werden, wie viele Figuren bei einer Population noch leben, was die aktuelle durchschnittliche Lebenszeit/Energie und Generation jeder Population ist. Hier ist erkennbar, wie sich die Populationen im aktuellen Augenblick verhalten und agieren.',
      subheading5: 'Darstellung des künstlichen neuronalen Netzes',
      image6: 'Beispielbild Darstellung des künstlichen neuronalen Netzes',
      text7:
        'Hat man eine Figur ausgewählt, wird in der Mitte live ihr künstliches neuronales Netz angezeigt. Hierbei sind ganz links die Sinne der Figur als Knoten dargestellt (aktuelle Energie der Figur, Energie des Feldes auf dem die Figur sich befindet und die Energie des Feldes auf das die Figur blickt) und ganz rechts die möglichen Aktionen der Figur (Drehen, Bewegen, Essen). Zwischen diesen fest vorgegebenen Knoten befinden sich je nach Architektur des Netzes verschiedene Zwischenknoten und Verbindungen, die die Eingabeinformationen nach rechts zu den Aktionen weitertragen bzw. manipulieren. Es kann hierbei auf jeden Knoten geklickt werden um die Gewichte der eingehenden und ausgehenden Verbindungen anzuzeigen. Je dicker die Verbindungslinie zwischen zwei Knoten, desto höher ist das aktuelle Gewicht dieser Verbindung. Innerhalb der Knoten wird deren aktueller Wert angezeigt. Hier kann live nachverfolgt werden, wenn eine Änderung der Sinne/Eingaben (z.B. wenn nun ein Wasserfeld vor der Figur ist) direkt im künstlichen neuronalen Netz zu einer neuen Aktion führt.',
      subheading6: 'Darstellung von Details',
      image7: 'Beispielbild Darstellung von Details',
      text8:
        'Links unten sind Detaildaten in Textform ersichtlich. Eine Beschreibung und globale Daten, wie Anzahl der Populationen, Anzahl der Ticks pro Sekunde, der aktuelle Tick der Simulation etc. sind hier zu finden. Falls eine Figur angewählt ist, sind auch deren Daten aufgelistet, wie zugehörige Population, Tick der Geburt oder aktuelle Lebenszeit.',
      subheading7: 'Darstellung der \'besten\' Figuren',
      image8: "Beispielbild Darstellung der 'besten' Figuren",
      text9:
        'Rechts unten ist ein Ranking der Figuren zu sehen. Hier kann live nachvollzogen werden, welche Figuren die längste Lebenszeit haben oder welche Figur die längste Lebenszeit pro Population hat. Hier können die aufgelisteten Figuren auch direkt angewählt werden.',
    },
    section4: {
      heading: 'Was ist der Nutzen?',
      text1:
        'Der primäre Nutzen dieser Anwendung soll sein, die Funktionsweise von künstlichen neuronalen Netzen einfacher verständlich und transparenter zu machen.',
      text2:
        'Hierfür wurde das oben beschriebene Szenario gewählt, um ein konkretes aber gleichzeitig nachvollziehbares Setting zu erhalten: Je länger eine Figur auf der Karte lebt, desto besser.',
      text3:
        'Ziel war es, anhand der verschiedenen Visualisierungen besser nachvollziehbar zu machen, wie Figuren, bzw. Generationen oder Populationen, intelligenter werden (oder auch nicht) und wie die Sinne/Inputs einer Figur im künstlichen neuronalen Netz verarbeitet und in Aktionen umgesetzt werden.',
      text4:
        'Die Anwendung wurde zudem so entwickelt, dass diese einfach konfiguriert, angepasst und sogar erweitert werden kann. Außerdem wurde der gesamte Programmcode über GitHub veröffentlicht, um diesen für alle Interessierten leicht zugänglich zu machen. Denkbar wäre beispielsweise, neue Architekturen oder Lernverfahren für neuronale Netze hinzuzufügen und diese mit bereits implementierten zu vergleichen.',
    },
    section5: {
      heading: 'Schlusswort',
      text: 'Viel Spaß mit dieser Anwendung! - Michael Schöffel',
    },
    section6: {
      heading: 'Kontakt & Impressum',
      text1: 'Michael Schöffel',
      text2: 'mschoeffel.de',
    },
  },
};
