/* ============ WORLD WAR II DOSSIER — content data ============
   Figures are commonly cited historical estimates; sources differ.
   Images are loaded live from Wikipedia (see main.js -> wikiImage). */
window.WW2 = {

  chapters: [
    { id:"c1", years:"1919–39", title:"The Peace That Failed", wiki:"Munich_Agreement",
      alt:"Leaders at the Munich Conference, 1938",
      cap:"The Munich Conference, September 1938: Britain and France let Germany take the Sudetenland.",
      paras:[
        "The Treaty of Versailles ended the First World War in 1919 and left Germany humiliated, indebted and bitter. The Great Depression then wrecked economies across the world, and fear made extremist promises easy to believe.",
        "Fascist Italy invaded Ethiopia in 1935. Japan seized Manchuria in 1931 and began a full-scale war on China in 1937. Germany rearmed, absorbed Austria in March 1938 and took the Sudetenland after the Munich Agreement. On 23 August 1939 Germany and the Soviet Union signed a non-aggression pact with a secret plan to divide Poland."
      ], stat:{n:"1939", l:"The year the pact was signed and the last peaceful summer ended."} },

    { id:"c2", years:"1939–40", title:"Lightning War", wiki:"Invasion_of_Poland",
      alt:"German troops during the invasion of Poland",
      cap:"German forces in Poland, September 1939. Blitzkrieg combined tanks, aircraft and fast infantry.",
      paras:[
        "Germany invaded Poland on 1 September 1939. Britain and France declared war two days later, but could do little to save Poland. The Soviet Union invaded from the east on 17 September, and Poland was divided within weeks.",
        "In spring 1940 the German army struck north and west: Denmark and Norway in April, then the Netherlands, Belgium and France from 10 May. The British army was trapped at Dunkirk and about 338,000 Allied soldiers were pulled off the beaches by warships and hundreds of civilian boats. France signed an armistice on 22 June."
      ], stat:{n:"6 wks", l:"Roughly how long it took Germany to defeat France in 1940."} },

    { id:"c3", years:"1940–41", title:"Britain Stands Alone", wiki:"The_Blitz",
      alt:"London during the Blitz",
      cap:"London during the Blitz. Roughly 43,000 British civilians died in the bombing campaign.",
      paras:[
        "With France gone, Britain refused to negotiate. In the Battle of Britain, from July to October 1940, the Royal Air Force defeated the Luftwaffe over southern England. Radar and a tightly run fighter control system gave the outnumbered defenders their edge, and Germany shelved its invasion plans.",
        "The Luftwaffe turned to night bombing. The Blitz began on 7 September 1940 and hit London for 57 nights in a row, then spread to Coventry, Liverpool, Glasgow and other cities. It ran until May 1941 and killed about 43,000 civilians, but it did not break British resolve."
      ], stat:{n:"57", l:"Consecutive nights London was bombed in autumn 1940."} },

    { id:"c4", years:"1941", title:"The War Goes Global", wiki:"Attack_on_Pearl_Harbor",
      alt:"Battleships burning at Pearl Harbor",
      cap:"Battleship Row burning at Pearl Harbor, 7 December 1941.",
      paras:[
        "On 22 June 1941 Germany broke its pact with Stalin and launched Operation Barbarossa, the largest invasion in history. More than three million Axis soldiers attacked across a front of over 1,500 kilometres. The Soviet Union lost armies and territory in months, but held before Moscow in December.",
        "On 7 December 1941 Japan struck the US Pacific Fleet at Pearl Harbor, killing 2,403 Americans, and attacked British and Dutch colonies across Asia at the same time. Germany declared war on the United States four days later. A European war and an Asian war had become one world war."
      ], stat:{n:"2,403", l:"Americans killed at Pearl Harbor and across Oahu on 7 December 1941."} },

    { id:"c5", years:"1942–43", title:"The Tide Turns", wiki:"Battle_of_Stalingrad",
      alt:"Ruined Stalingrad",
      cap:"The ruins of Stalingrad. Street fighting in the city lasted months.",
      paras:[
        "In June 1942 US carrier aircraft sank four Japanese fleet carriers at Midway and ended Japan's run of victories. In North Africa the British Eighth Army beat Rommel's forces at El Alamein in November.",
        "The decisive battle was Stalingrad. Between August 1942 and 2 February 1943 the German Sixth Army was encircled and forced to surrender; total casualties on both sides are estimated at about two million. Germany's last big offensive in the East failed at Kursk in July 1943, and the Allies invaded Italy in September. Meanwhile, from occupied Europe, the Nazi regime was carrying out the Holocaust, the murder of about six million Jews."
      ], stat:{n:"~2M", l:"Estimated total casualties in the battle of Stalingrad."} },

    { id:"c6", years:"1944", title:"The Long Road Home", wiki:"Normandy_landings",
      alt:"Allied troops landing in Normandy",
      cap:"Allied troops wade ashore in Normandy, 6 June 1944.",
      paras:[
        "On 6 June 1944 (D-Day) about 156,000 Allied troops landed on five beaches in Normandy, backed by thousands of ships and aircraft. Two weeks later the Soviet Union opened Operation Bagration, which destroyed most of Germany's Army Group Centre. Paris was liberated on 25 August.",
        "Germany still had one gamble left: the Battle of the Bulge, launched in the Ardennes on 16 December 1944, which the Allies turned back by late January. In the Pacific, US forces took the Mariana Islands and won the vast naval battle of Leyte Gulf in October, bringing Japan within bomber range."
      ], stat:{n:"156,000", l:"Allied troops landed in Normandy on D-Day."} },

    { id:"c7", years:"1945", title:"Downfall", wiki:"Atomic_bombings_of_Hiroshima_and_Nagasaki",
      alt:"Mushroom cloud over Nagasaki",
      cap:"The atomic bombings of Hiroshima (6 August) and Nagasaki (9 August) 1945.",
      paras:[
        "Soviet troops liberated Auschwitz on 27 January 1945 and reached Berlin in April. Hitler died by suicide on 30 April, and Germany surrendered on 8 May, celebrated as V-E Day. In the Pacific, the brutal battles of Iwo Jima and Okinawa showed how costly an invasion of Japan would be.",
        "On 6 August the United States dropped an atomic bomb on Hiroshima, and another on Nagasaki on 9 August. The Soviet Union declared war on Japan on 8 August. Japan announced its surrender on 15 August, and the formal signing took place on 2 September aboard the USS Missouri."
      ], stat:{n:"2 Sep", l:"1945: Japan signs the surrender. The war is over."} },

    { id:"c8", years:"After", title:"What Was Left", wiki:"Nuremberg_trials",
      alt:"Defendants at the Nuremberg trials",
      cap:"The main defendants at the Nuremberg trials, 1945–46.",
      paras:[
        "An estimated 70 to 85 million people died, about three percent of the world's population, and most of them were civilians. Cities from Warsaw to Nagasaki lay in ruins. Millions were left homeless or displaced.",
        "The United Nations was founded in October 1945. The Nuremberg trials began in November and established that leaders can be tried for crimes against humanity. The wartime allies split into two blocs, the Cold War began, and the old European empires soon started to unravel."
      ], stat:{n:"70–85M", l:"Estimated deaths, soldiers and civilians together."} }
  ],

  theatres: {
    europe:  { name:"Europe",           color:"#a3110f" },
    med:     { name:"Africa & Med",     color:"#a98a3d" },
    pacific: { name:"Pacific & Asia",   color:"#4b5530" },
    world:   { name:"Diplomacy",        color:"#17130f" }
  },

  events: [
    { d:"1939-08-23", t:"Nazi–Soviet Pact", th:"world", x:"Germany and the Soviet Union sign a non-aggression pact. A secret protocol divides Eastern Europe between them." },
    { d:"1939-09-01", t:"Germany invades Poland", th:"europe", x:"German forces cross the border at dawn. Britain and France declare war on Germany on 3 September." },
    { d:"1939-09-17", t:"Soviet invasion of Poland", th:"europe", x:"The Red Army enters eastern Poland, and the country is partitioned." },
    { d:"1940-04-09", t:"Denmark and Norway invaded", th:"europe", x:"Germany takes Denmark in hours and fights for Norway for two months." },
    { d:"1940-05-10", t:"Attack in the West", th:"europe", x:"Germany invades the Netherlands, Belgium, Luxembourg and France. Winston Churchill becomes British prime minister the same day." },
    { d:"1940-05-26", t:"Dunkirk evacuation begins", th:"europe", x:"Operation Dynamo brings about 338,000 Allied soldiers off the beaches by 4 June." },
    { d:"1940-06-22", t:"France signs armistice", th:"europe", x:"France capitulates. Germany occupies the north and west; a collaborationist government is set up in Vichy." },
    { d:"1940-07-10", t:"Battle of Britain begins", th:"europe", x:"The Luftwaffe attacks shipping and airfields. The RAF holds until October." },
    { d:"1940-09-07", t:"The Blitz begins", th:"europe", x:"London is bombed for 57 consecutive nights. Other British cities follow." },
    { d:"1940-09-13", t:"Italy invades Egypt", th:"med", x:"Italian forces advance from Libya. A British counter-offensive soon pushes them back." },
    { d:"1941-03-11", t:"Lend-Lease Act", th:"world", x:"The United States authorises massive supplies to Britain and, later, the Soviet Union." },
    { d:"1941-06-22", t:"Operation Barbarossa", th:"europe", x:"Germany invades the Soviet Union with over three million troops along a huge front." },
    { d:"1941-08-14", t:"Atlantic Charter", th:"world", x:"Roosevelt and Churchill publish shared war aims: no territorial gains, and self-determination for peoples." },
    { d:"1941-09-08", t:"Siege of Leningrad", th:"europe", x:"German and Finnish forces encircle the city. The siege lasts about 872 days and hundreds of thousands of civilians die, mostly from starvation." },
    { d:"1941-12-07", t:"Pearl Harbor", th:"pacific", x:"Japanese carrier aircraft attack the US Pacific Fleet in Hawaii. The United States enters the war." },
    { d:"1941-12-25", t:"Hong Kong falls", th:"pacific", x:"British forces surrender after 18 days of fighting, one of several rapid Japanese conquests." },
    { d:"1942-01-20", t:"Wannsee Conference", th:"europe", x:"Nazi officials meet near Berlin to coordinate the organised murder of Europe's Jews." },
    { d:"1942-02-15", t:"Singapore surrenders", th:"pacific", x:"About 80,000 Allied troops are taken prisoner, the largest British surrender in history." },
    { d:"1942-06-04", t:"Battle of Midway", th:"pacific", x:"US aircraft sink four Japanese fleet carriers in a single battle." },
    { d:"1942-08-07", t:"Guadalcanal landings", th:"pacific", x:"US Marines land, opening a six-month campaign to hold the island." },
    { d:"1942-10-23", t:"Second Battle of El Alamein", th:"med", x:"The British Eighth Army breaks the Axis line in Egypt. It is the end of Axis hopes in North Africa." },
    { d:"1943-02-02", t:"Stalingrad ends", th:"europe", x:"The German Sixth Army surrenders. It is the first great German defeat in the East." },
    { d:"1943-05-13", t:"Axis surrender in Tunisia", th:"med", x:"Around 250,000 Axis troops surrender, ending the North African campaign." },
    { d:"1943-07-05", t:"Battle of Kursk", th:"europe", x:"Germany's last major offensive in the East is halted by deep Soviet defences." },
    { d:"1943-07-10", t:"Allies invade Sicily", th:"med", x:"The first Allied landings on Axis European soil. Mussolini is overthrown two weeks later." },
    { d:"1943-09-03", t:"Allies invade Italy", th:"europe", x:"Landings on the Italian mainland. Italy announces its armistice on 8 September." },
    { d:"1943-11-28", t:"Tehran Conference", th:"world", x:"Roosevelt, Churchill and Stalin meet together for the first time and agree on a Western invasion of France." },
    { d:"1944-06-06", t:"D-Day", th:"europe", x:"About 156,000 Allied troops land on the Normandy beaches." },
    { d:"1944-08-25", t:"Paris liberated", th:"europe", x:"Allied troops and the Free French enter Paris after four years of occupation." },
    { d:"1944-10-23", t:"Battle of Leyte Gulf", th:"pacific", x:"The largest naval battle of the war destroys what remains of Japan's fleet." },
    { d:"1944-12-16", t:"Battle of the Bulge", th:"europe", x:"Germany's last offensive in the West hits the Ardennes. It is defeated by late January." },
    { d:"1945-01-27", t:"Auschwitz liberated", th:"europe", x:"Soviet troops reach the camp complex where over a million people were murdered." },
    { d:"1945-02-04", t:"Yalta Conference", th:"world", x:"The Big Three discuss the shape of postwar Europe, occupation zones for Germany, and the United Nations." },
    { d:"1945-02-19", t:"Battle of Iwo Jima", th:"pacific", x:"US Marines land on the volcanic island. Of some 20,000 Japanese defenders, nearly all die." },
    { d:"1945-04-01", t:"Battle of Okinawa", th:"pacific", x:"The last and biggest island battle of the Pacific. Over 100,000 Okinawan civilians die." },
    { d:"1945-04-30", t:"Hitler dies", th:"europe", x:"As Soviet troops close in on his Berlin bunker, Hitler dies by suicide." },
    { d:"1945-05-08", t:"V-E Day", th:"europe", x:"Germany's unconditional surrender takes effect. The war in Europe is over." },
    { d:"1945-07-17", t:"Potsdam Conference", th:"world", x:"The Allies meet in Germany to settle postwar order and warn Japan to surrender." },
    { d:"1945-08-06", t:"Hiroshima", th:"pacific", x:"The United States drops an atomic bomb on Hiroshima." },
    { d:"1945-08-09", t:"Nagasaki and Manchuria", th:"pacific", x:"A second atomic bomb hits Nagasaki, and Soviet forces invade Japanese-held Manchuria." },
    { d:"1945-09-02", t:"Japan signs surrender", th:"pacific", x:"The formal surrender is signed aboard the USS Missouri in Tokyo Bay." },
    { d:"1945-10-24", t:"United Nations founded", th:"world", x:"The UN Charter enters into force." },
    { d:"1945-11-20", t:"Nuremberg trials begin", th:"world", x:"Leading Nazi officials are tried by an international tribunal." }
  ],

  battles: [
    { id:"britain", name:"Battle of Britain", when:"Jul – Oct 1940", front:"europe", wiki:"Battle_of_Britain",
      sides:"RAF vs. Luftwaffe", out:"British victory. Germany fails to win air superiority and shelves invasion plans.",
      toll:"About 1,000 RAF and 1,900 Luftwaffe aircraft lost (est.)." },
    { id:"midway", name:"Battle of Midway", when:"4 – 7 Jun 1942", front:"pacific", wiki:"Battle_of_Midway",
      sides:"US Navy vs. Imperial Japanese Navy", out:"US victory. Four Japanese fleet carriers sunk for one American carrier, the Yorktown.",
      toll:"About 3,000 Japanese and 300+ American dead (est.)." },
    { id:"alamein", name:"Second El Alamein", when:"23 Oct – 11 Nov 1942", front:"med", wiki:"Second_Battle_of_El_Alamein",
      sides:"British Eighth Army vs. Afrika Korps and Italians", out:"Allied victory. Axis forces are driven out of Egypt and Libya.",
      toll:"About 13,500 Allied casualties; Axis losses were far higher, with some 30,000 captured (est.)." },
    { id:"stalingrad", name:"Battle of Stalingrad", when:"Aug 1942 – Feb 1943", front:"europe", wiki:"Battle_of_Stalingrad",
      sides:"Soviet Union vs. Germany and allies", out:"Soviet victory. A whole German army is destroyed and the initiative passes to the Red Army.",
      toll:"About two million casualties on both sides (est.)." },
    { id:"kursk", name:"Battle of Kursk", when:"Jul – Aug 1943", front:"europe", wiki:"Battle_of_Kursk",
      sides:"Soviet Union vs. Germany", out:"Soviet victory. Germany's last big offensive in the East fails, and it never regains the initiative.",
      toll:"Over a million combined casualties (est.); thousands of tanks lost." },
    { id:"dday", name:"D-Day, Normandy", when:"6 Jun 1944", front:"europe", wiki:"Normandy_landings",
      sides:"US, UK, Canada and Allies vs. Germany", out:"Allied success. A foothold is won in France, opening the Western Front.",
      toll:"At least 4,400 Allied dead on the day (confirmed)." },
    { id:"bulge", name:"Battle of the Bulge", when:"16 Dec 1944 – 25 Jan 1945", front:"europe", wiki:"Battle_of_the_Bulge",
      sides:"US and UK vs. Germany", out:"Allied victory. Germany exhausts its last reserves.",
      toll:"About 19,000 American dead, the costliest US battle of the war (est.)." },
    { id:"iwo", name:"Battle of Iwo Jima", when:"19 Feb – 26 Mar 1945", front:"pacific", wiki:"Battle_of_Iwo_Jima",
      sides:"US Marines and Navy vs. Japan", out:"US victory after five weeks of fighting for eight square miles.",
      toll:"About 6,800 US dead; nearly all of some 20,000 Japanese defenders killed (est.)." },
    { id:"okinawa", name:"Battle of Okinawa", when:"1 Apr – 22 Jun 1945", front:"pacific", wiki:"Battle_of_Okinawa",
      sides:"US and allies vs. Japan", out:"US victory. Its cost persuaded planners that invading Japan would be catastrophic.",
      toll:"More than 200,000 dead in total, including over 100,000 civilians (est.)." },
    { id:"berlin", name:"Battle of Berlin", when:"16 Apr – 2 May 1945", front:"europe", wiki:"Battle_of_Berlin",
      sides:"Soviet Union vs. Germany", out:"Soviet victory. The German capital falls, and the war in Europe ends days later.",
      toll:"Over 80,000 Soviet dead; heavy German and civilian losses (est.)." }
  ],

  deaths: [
    { c:"Soviet Union", v:27,   note:"Roughly 27 million: about 8–9 million soldiers and the rest civilians." },
    { c:"China",        v:15,   note:"Estimates run from 15 to 20 million, mostly civilians." },
    { c:"Germany",      v:7,    note:"Roughly 6.6–8.8 million including soldiers and civilians." },
    { c:"Poland",       v:5.9,  note:"About 6 million, roughly a fifth of its pre-war population, including 3 million Polish Jews." },
    { c:"Japan",        v:3,    note:"About 2.5–3.1 million." },
    { c:"Yugoslavia",   v:1,    note:"About 1 million." },
    { c:"France",       v:0.6,  note:"About 600,000." },
    { c:"United Kingdom",v:0.45,note:"About 450,000." },
    { c:"Italy",        v:0.45, note:"About 450,000." },
    { c:"United States",v:0.41, note:"About 410,000." }
  ],

  facts: [
    { n:"70–85M", q:"How many people died?", a:"About three percent of the 2.3 billion people alive in 1939. Roughly two thirds of the dead were civilians." },
    { n:"338,000", q:"Dunkirk", a:"Soldiers rescued from the beaches in nine days, using navy ships and hundreds of small civilian boats such as ferries, yachts and fishing boats." },
    { n:"1932", q:"Breaking Enigma", a:"Polish mathematicians first broke the German Enigma cipher in 1932. Their methods were passed to Britain in 1939 and became the basis of the work at Bletchley Park." },
    { n:"6", q:"Killed by a balloon", a:"In May 1945 six people were killed in Oregon by a Japanese balloon bomb. They are the only people killed by enemy action on the US mainland during the war." },
    { n:"130,000", q:"The Manhattan Project", a:"At its peak the secret programme to build the atomic bomb employed about 130,000 people, and most of them did not know what they were building." },
    { n:"1974", q:"The last soldier", a:"Japanese officer Hiroo Onoda kept fighting in the Philippine jungle until 1974 because he did not believe the war was over." },
    { n:"1939–45", q:"Battle of the Atlantic", a:"Six years of convoys and U-boats: the longest continuous campaign of the war, from the first day to the last." },
    { n:"~400", q:"Navajo code talkers", a:"About 400 Navajo Marines served as code talkers, sending messages in a code built on their own language. Japan never broke it." },
    { n:"V-2", q:"First ballistic missile", a:"The German V-2 rocket, used from September 1944, was the first long-range ballistic missile. It later launched both the Soviet and American space programmes." },
    { n:"57", q:"Nights of the Blitz", a:"London was bombed on 57 consecutive nights from 7 September 1940. Many families slept in Underground stations." },
    { n:"18 days", q:"Hong Kong", a:"Hong Kong held out for 18 days against Japan in December 1941 before it surrendered on Christmas Day." },
    { n:"Millions", q:"Women at work", a:"In Britain and the United States millions of women took factory, farm and military jobs, and their role changed what society expected of them." }
  ],

  quiz: [
    { q:"On what date did Germany invade Poland?", o:["1 September 1939","3 September 1939","10 May 1940","22 June 1941"], a:0, w:"Germany invaded Poland on 1 September 1939. Britain and France declared war on 3 September." },
    { q:"Which battle destroyed four Japanese fleet carriers in June 1942?", o:["Guadalcanal","Midway","Leyte Gulf","Iwo Jima"], a:1, w:"At Midway, US carrier aircraft sank four Japanese fleet carriers." },
    { q:"About how many Allied soldiers were evacuated from Dunkirk?", o:["38,000","138,000","338,000","838,000"], a:2, w:"Around 338,000 troops were brought off the beaches between 26 May and 4 June 1940." },
    { q:"What was the code name of the German invasion of the Soviet Union?", o:["Overlord","Sea Lion","Torch","Barbarossa"], a:3, w:"Operation Barbarossa began on 22 June 1941." },
    { q:"Which country lost the most people in the war?", o:["China","Germany","Soviet Union","United States"], a:2, w:"The Soviet Union lost roughly 27 million people, more than any other country." }
  ]
};
