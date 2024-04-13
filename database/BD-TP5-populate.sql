-- Voici des exemples d'insertion pour les diférentes tables de votre base de donnée pour vous aider lors de la création de votre application ou de vos requêtes 
-- N'hésitez pas à ajouter d'autres exemplaires à une table si necessaire

SET search_path = ornithologue_bd;

-- Insérer des observateurs
INSERT INTO Observateur VALUES 
('OB001', 'Albert Einstein', 'albert.einstein@polymtl.ca'),
('OB002', 'Marie Curie', 'marie.curie@polymtl.ca'),
('OB003', 'Charles Babbage', 'charles.babbage@polymtl.ca'),
('OB004', 'Nikola Tesla', 'nikola.tesla@polymtl.ca'),
('OB005', 'Ada lovelace', 'ada.lovelace@polymtl.ca'),
('OB006', 'Isaac Newton', 'isaac.newton@polymtl.ca'),
('OB007', 'Pierre Lapointe', 'pierre.lapointe@polymtl.ca');

-- Insérer des communautés
INSERT INTO Communaute VALUES 
('Les oiseaux de montréal', 'Communauté damateur doiseaux dans la région de Montréal'),
('Les oiseaux rares', 'Communauté chasant des oiseaux rares');

-- Insérer des amateurs
INSERT INTO Amateur VALUES 
('OB001', 90, 'Les oiseaux de montréal'),
('OB003', 85, 'Les oiseaux rares'),
('OB005', 70, 'Les oiseaux de montréal');

-- Insérer des professionnels
INSERT INTO Professionnel VALUES 
('OB002', 'License1'),
('OB004', 'License2'),
('OB006', 'License3'),
('OB007', 'License42');

INSERT INTO Expertise VALUES 
('Ornithologie', 'Les oiseaux de montréal'),
('Biologie', 'Les oiseaux de montréal'),
('Photographie', 'Les oiseaux de montréal'),
('Photographie', 'Les oiseaux rares');

-- Insérer des espèces d'oiseaux
INSERT INTO Especeoiseau VALUES 
('BrantaCanadensis', 'Bernache du Canada', 'Vulnérable', NULL),
('FalcoPeregrinus', 'Faucon pèlerin', 'Préoccupation mineure', NULL),
('PasserDomesticus', 'Moineau domestique', 'Non menacée', NULL),
('CarduelisCarduelis', 'Chardonneret élégant', 'Non menacée', NULL),
('AquilaChrysaetos', 'Aigle royal', 'Vulnérable', NULL),
('BuboBubo', 'Grand-duc dEurope', 'Non menacée', NULL),
('CyanocittaCristata', 'Geai bleu', 'Vulnérable', 'FalcoPeregrinus'),
('TurdusMigratorius', 'Merle américain', 'Non menacée', 'FalcoPeregrinus'),
('SturnusVulgaris', 'Étourneau sansonnet', 'Non menacée', 'BrantaCanadensis'),
('PicaPica', 'Pie bavarde', 'Vulnérable', 'BrantaCanadensis');

-- Insérer des rapports
INSERT INTO Rapport VALUES 
('RA001', 'Observation printanière', 'Beaucoup dactivité dans la zone nord.', 'OB001', '2023-05-15'),
('RA002', 'Observation estivale', 'Peu dactivité due à la chaleur.', 'OB007', '2023-07-20'),
('RA003', 'Migration automnale', 'Observation de la migration.', 'OB007', '2023-11-20'),
('RA004', 'Hivernage des espèces', 'Nombreuses espèces en hivernage.', 'OB005', '2023-12-15');

-- Insérer des observations 
INSERT INTO Observation VALUES 
('OBS001', 'Vu en grand nombre', '2023-12-24', 'RA001', 'OB001', 'BrantaCanadensis'),
('OBS002', 'Vu isolément', '2024-01-03', 'RA003', 'OB007', 'FalcoPeregrinus'),
('OBS003', 'Activité notable', '2023-12-17', 'RA002', 'OB003', 'PasserDomesticus'),
('OBS004', 'Nidification observée', '2024-01-05', 'RA004', 'OB005', 'CarduelisCarduelis'),
('OBS005', 'En vol haut', '2023-12-30', 'RA001', 'OB001', 'CyanocittaCristata'),
('OBS006', 'Chant matinal', '2023-05-20', 'RA002', 'OB003', 'CarduelisCarduelis'),
('OBS007', 'Regroupement important', '2023-07-25', 'RA003', 'OB002', 'CyanocittaCristata'),
('OBS008', 'Comportement agressif', '2023-08-15', 'RA004', 'OB005', 'SturnusVulgaris'),
('OBS009', 'Migration précoce observée', '2023-11-10', 'RA001', 'OB007', 'PicaPica'),
('OBS010', 'Solitaire et discret', '2023-12-22', 'RA002', 'OB007', 'BuboBubo'),
('OBS011', 'Solitaire et discret', '2023-12-22', 'RA002', 'OB007', 'SturnusVulgaris'),
('OBS012', 'Migration tardive', '2023-05-08', 'RA001', 'OB005', 'FalcoPeregrinus');

-- Insérer des zones géographiques
INSERT INTO Zonegeographique VALUES 
('ZoneNord', 'Zone nordique froide', 45, -74),
('ZoneSud', 'Zone sudique chaude', 42, -73),
('Montréal', 'Zone urbaine', 45, -73),
('ZoneEst', 'Zone Est', 46, -73);

-- Insérer des résidences d'espèces
INSERT INTO Resider VALUES 
('BrantaCanadensis', 'ZoneNord', 150),
('FalcoPeregrinus', 'ZoneSud', 30),
('PasserDomesticus', 'Montréal', 200),
('CarduelisCarduelis', 'ZoneNord', 75),
('AquilaChrysaetos', 'ZoneSud', 5),
('BuboBubo', 'Montréal', 10),
('BuboBubo', 'ZoneNord', 69),
('CyanocittaCristata', 'ZoneNord', 120),
('TurdusMigratorius', 'ZoneSud', 200),
('SturnusVulgaris', 'ZoneEst', 300),
('PicaPica', 'ZoneNord', 50);

