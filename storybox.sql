-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-11-2017 a las 01:50:21
-- Versión del servidor: 10.1.21-MariaDB
-- Versión de PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `storybox`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL COMMENT 'indice de la categoria',
  `name` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Nombre de la ategoria'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='Tabla de las categorias de las historias';

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'The Weekly Jarys'),
(2, 'True Story'),
(3, 'Short Stories'),
(4, 'Story Cubes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL COMMENT 'Id unico de la historia',
  `title` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'titulo de la historia',
  `history` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Historia',
  `summary` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'Resume de la historia',
  `url` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'URL de la imagen asociada a la historia',
  `date` varchar(150) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'fecha de la historia',
  `category` int(11) NOT NULL COMMENT 'id de la categoria de la historia'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `history`
--

INSERT INTO `history` (`id`, `title`, `history`, `summary`, `url`, `date`, `category`) VALUES
(1, 'Through The Window', '<p style=\"text-indent: 40px\">The sky was as blue as it could be that summer morning. The sun was warming the cold roads and taking away what was left of the rainy night. The grass was bright green and the trees were bushy at the East Park. Everything seemed perfect, even the increasing heat (which made some people wish for winter to come faster, but nothing a good ice cream couldn’t fix).</p>\r\n<p style=\"text-indent: 40px\">Right after breakfast time, the kids were playing at the playground placed at the park, and sounds of their laughing just filled the air with a cheerful essence.</p>\r\n<p style=\"text-indent: 40px\">A kid --Little Matthew--, who lived in the white house across the street, was shouting the door behind his back, preparing himself for a day full of games and fun. He ran to his friends -- three other kids that were playing hide and seek--, one of them --little Steve--, was hiding behind a tree, and laughing so hard even squirrels could hear. “Found you!” Shouted a little girl who was pointing at him. Both of them started running, and Matthew ran towards them making funny noises and calling their names.</p>\r\n<p style=\"text-indent: 40px\">All kids were happy. They all played and had fun until every inch of their energy had drained off. None of them went to sleep without a smile on the face, and they all hoped to wake up to another fun and playful date. Nevertheless, life had very different plans, for one of the kids wouldn’t be playing the next day.</p>\r\n<p style=\"text-indent: 40px\">When Matthew woke up, and the sun warmed the air, he saw his mother standing by the door frame. She looked sad, and her eyes were different from how the’d been last night. She was holding the phone, but she wasn’t talking, she was staring at her son, who was pale and shaking from soul to body.</p> \r\n<p style=\"text-indent: 40px\">“You’ll stay inside today, ok?” She said. Matthew only nodded with his head. When his mother were out of sight he took a deep breath and swallowed hard; he knew what that phone call meant, and he was sure it wasn’t as good as planed. \r\nSo the day went by and he just gazed through the window. He could see his friends playing and having fun down in the playground, he could hear them laughing and yelling at each other, announcing they would be playing another game of soccer. It was fun for Matthew, watching his friends’ little adventures, but even with the short distance he could not recognize their little funny gestures.</p> \r\n<p style=\"text-indent: 40px\">Matthew was bored, and a little nostalgic -- even when it had been just a day, he was a kid, being locked up in such a beautiful day could feel traumatic --.</p>\r\n<p style=\"text-indent: 40px\">“You are not gonna come outside?” Asked little Steve standing by the window, as near as he could be. “We are gonna play at the slide”.</p>\r\n<p style=\"text-indent: 40px\">Matthew shook his head, letting Steve know he couldn’t play. He told him not to worry though, and have fun in the slide, he would be looking from the window, and he will be just fine.</p>\r\n<p style=\"text-indent: 40px\">All their friends went away, and played until the sun was gone. All their mothers started calling them to go inside, because they had to have dinner, and then go to bed with a big smile. Little they knew that in the next morning, --again-- their friend Matthew wouldn’t be outside to play.</p>\r\n<p style=\"text-indent: 40px\">So there he were, in another wonderful day, gazing through the window, looking at his friends. </p>\r\n<p style=\"text-indent: 40px\">“Somehow…” little Matthew was thinking “The distance between us seems like it’s getting bigger”. “That’s impossible” He answered to himself “The house hadn’t moved anywhere”.</p>\r\n<p style=\"text-indent: 40px\">He yelled to his best friend, and Steve came running, answering to the sound of his name.</p>\r\n<p style=\"text-indent: 40px\">“Hello there” He said. “Are you gonna come out today?” Matthew, in response, just shook again his head. “That’s too bad”  said Steve “We miss you down here”.</p> \r\n<p style=\"text-indent: 40px\">“I miss you too” Matthew said, his voice sounded strange, but he opened his mouth and spoke again. “I wish I could Play” he said.</p>\r\n<p style=\"text-indent: 40px\">“Why you can’t by the way?” Asked little Steve. Matthew just let out a sigh, and said “I’m not allowed to tell”.</p>\r\n<p style=\"text-indent: 40px\">Both kids remained in silence, for what it felt like a year, then the other kids started yelling, calling Steve. He looked up at Matthew, who was sad on the window, smiled at him, and turn his back little by little. How could he know he was losing his friend if, as Matthew had told him, he was not allowed to tell?</p>\r\n<p style=\"text-indent: 40px\">The days passed by and the summer turned to fall, the leaves starting falling and covering the floor. Then winter came, and froze all of the trees, his friends were always at the park, not caring if the cold made them sneeze.</p>\r\n<p style=\"text-indent: 40px\">But none of them came to the window, for the day was too fun to waste, even when the lights went out and to do there’s nothing left, no one came to say goodbye, not even one of his friends.</p>\r\n<p style=\"text-indent: 40px\">A few days went by and he saw something odd: there were more kids playing in the park under the sun. “New Friends” he said to himself, unable to chase away the feeling that he had been replaced.</p>\r\n<p style=\"text-indent: 40px\">Soon enough Matthew noticed that seeing his friends was making him sad. “Nobody will notice if I no longer stand here to watch” He said to himself, then closed the window and the curtains. He wasn’t going to look through the window. Not again.</p>\r\n<p style=\"text-indent: 40px\">The time was still passing, and Matthew couldn’t go out. He was sad and angry, because the cost of some problems was his entire life. He no longer had friends nor he could go to school, everything in his life was now that room. He saw once more the playground at the park, that went rusty and dirty with the time. Nothing was the same, not even the view, the world as he remembered had turned obscure.</p>\r\n<p style=\"text-indent: 40px\">And there they were, punctual like clocks, the kids went out to play with snow. In the half empty room that was getting cold, one could still hear the echoes of the kids having fun.  Little they knew that by the time they were home, their former friend Matthew was long gone.</p> ', ' Nothing but a room. Nothing but a window. The outside world keeps running and changing without you . How much will it take to be    forgotten?', 'doc/images/window.jpg', 'Sep 7th 2017', 3),
(2, 'Fear of the Dark', '<p style=\"text-indent: 40px\">The forest was in complete darkness that stormy night. The ground and trees were full of scary, dangerous creatures. The white lights in the sky were immediately followed by the rumble of thunder, and those monster-shaped shadows that seemed to be moving closer. The sound of running water --there was a river nearby-- was drowned out by the loud, unceasing rain. Looking in any direction was like staring at a pitch black hole, unable to tell if it has a bottom.</p>\r\n<p style=\"text-indent: 40px\">The trees were as tall as buildings, and impossible to climb. The only way to get out of the forest was to walk. The little girl hiding between two rocks, that had been left behind by a group of hunters, had already reached that conclusion.</p>\r\n<p style=\"text-indent: 40px\">The girl started walking on the wet, muddy ground. Her feet were cold and covered in dirt. She couldn’t tell how much time she had been there, nor when was the last she ate something. She tried to follow the sounds to the river --She knew the river could lead her out of there-- but she was afraid to make any sound. She walked as quiet as she could for what she felt like hours, until something different appeared under her feet; she wasn’t standing on mud anymore. The girl moved her hands slowly, expecting to grab something cold and with sharp edges. She did. She knew she was in the bridge right above the river. The sound of her footstep wasn’t scary anymore, and she was calmed, because she knew where she was.</p>\r\n<p style=\"text-indent: 40px\">The girl could feel the warm sun on her face, taking away the coldness in her body. She knew her eyes were opened, but she couldn’t see it. Tears started to run down her chick. Now she knew why she was left behind, and why the forest she knew so well now seemed so gloomy; because she was scared of a darkness that wasn’t really there.</p>', ' When the darkness is all around you, the only thing to do is seek the light.', 'doc/images/fear.jpg', 'Sep 7th 2017', 4),
(3, 'Smoke', '<p style=\"text-indent: 40px\">The richest neighborhood was a little far from the city. The houses there were the biggest in the country. Only important people could be found living in these houses, so it was in fact a very quiet place.</p>\r\n<p style=\"text-indent: 40px\">One summer day like any other, on this very same rich neighborhood, a chimney was sending a dark, dense smoke column to the sky. The day was hot and dry, so the fact that a fireplace was being used was odd. The smell coming out along with the smoke filled the air with an annoying hard-to-breath sensation.</p> \r\n<p style=\"text-indent: 40px\">Inside the house, in the living room, the fireplace was on with a crackling fire. A woman was sitting on the couch, reading a book. Her fancy clothes suggested she was about to go out, but her still hot half-full cup of coffee appeared to be opposing that statement.</p>\r\n<p style=\"text-indent: 40px\">The woman looked sad and a little concerned. She was staring at her book almost without blinking. The book had a picture of our planet on the cover, and the title was hard to read; the entire book was old and worn-out. Her hands were shaking, and her lips were almost blood-red from biting them too much. </p>\r\n<p style=\"text-indent: 40px\">The phone started ringing, so she took it without taking her eyes away from the book.</p>\r\n<p style=\"text-indent: 40px\">“We are ready” said the voice at the other side of the phone. “Our investigation is complete”.</p>\r\n<p style=\"text-indent: 40px\">“Are you sure no one is gonna notice your family is gone?” Said another voice in the phone.</p>\r\n<p style=\"text-indent: 40px\">“Not a single soul” Answered the woman.</p>\r\n<p style=\"text-indent: 40px\">“Then, proceed.”</p>\r\n<p style=\"text-indent: 40px\">The woman closed the book, and left the phone at the couch. She stood up and walked to the window to see the street one more time. A crow was staring at her from the other side of the one way glass. She knew it was impossible for the bird to actually see her, so she closed the curtains and turned around.</p> \r\n<p style=\"text-indent: 40px\">She was standing on the middle of the living room, staring at the fire, there was still some cloth pieces burning inside. She took a little bottle from the table, and drank the bluish liquid inside. She threw the bottle at the fire, like she had done the other times; no evidence could be left behind. </p>\r\n<p style=\"text-indent: 40px\">She walked forward and stepped into the fire. After several seconds of pain, the woman just disappeared. The smoke going through the chimney turned purplish, and the smell was kind of scented. Nobody knew she was gone.</p>\r\n<br>\r\n<p style=\"text-indent: 40px\">A few days went by till the police arrived. Some neighbors were worried about their properties; the fireplace inside that house had been on for days, and nobody seemed to be inside.</p>\r\n<p style=\"text-indent: 40px\">“What if the whole house catches fire?” Said a woman dressed like a royal queen. “Mine is just two houses away”.</p>\r\n<p style=\"text-indent: 40px\">Other neighbors had similar concerns.</p>\r\n<p style=\"text-indent: 40px\">The police decided to break in to put out the fire.</p>\r\n<p style=\"text-indent: 40px\">The house appeared to be empty. Nothing suggested that something was on fire.</p>\r\n<p style=\"text-indent: 40px\">In the living room, a purplish crow-like bird was staring at an opened book right in front of the fireplace. It’s wings seemed to have severe burns.</p>   \r\n<p style=\"text-indent: 40px\">“What the…” Said the police officer when he saw the fire place; there was no fire.</p>\r\n<p style=\"text-indent: 40px\">The smoke was still coming out of the chimney, but the source obviously wasn’t fire. The crow didn’t take its eyes off the book. The man took a look at it, and what he saw left him breathless: it was his own face staring back at him.  He took the book between his hands, and saw the cover: a picture of a strange planet could be seen on it, and the words It’s our turn in shiny letters. It looked like an old ritual to open portals to another dimension.</p>\r\n<p style=\"text-indent: 40px\">Suddenly, the flames appeared in the fireplace, and two hands took the man inside the fire.</p>\r\n<br>\r\n<p style=\"text-indent: 40px\">Several minutes later, a man with a purplish police uniform came out of the house. He went to the car where another policeman was waiting.</p>\r\n<p style=\"text-indent: 40px\">“What took you so long?” Asked the other man, impatient.</p>\r\n<p style=\"text-indent: 40px\">“I needed some help”.</p>', 'Not all those who come from fire are ashes...', 'doc/images/smoke.jpg', 'Sep 7th 2017', 4),
(4, 'Seven Birds', '<p style=\"text-indent: 40px\">Little raindrops were falling from the blue sky. A girl was staring at the horizon. The dark clouds were covering the sun, erasing the shadows from the ground. The trees in the forest looked pleased under the rain, unlike all the animals that she could see from the porch, that were moving around looking for refuge. The girl let out a sigh. The vacations were taking too long, and she was bored and lonely. The view from the cabin was beautiful, but she wasn’t allowed to go outside. </p>\r\n<p style=\"text-indent: 40px\">Her grandfather, that was looking at the same direction, had a big smile on his face. The girl, confused, asked him what was he so happy about. The old man looked at her, and gave her an even bigger smile.</p>\r\n<p style=\"text-indent: 40px\">“Isn’t it beautiful?” said he. The girl just nodded, disappointed. She was expecting a better answer. “What are you so unhappy about?” asked the old man. “you are too young to be like that”.</p>\r\n<p style=\"text-indent: 40px\">“I want to go” She said, looking away at the horizon.</p>\r\n<p style=\"text-indent: 40px\">“And why is that?” asked her grandfather.</p>\r\n<p style=\"text-indent: 40px\">“I’m bored, I can’t do anything”.</p>\r\n<p style=\"text-indent: 40px\">“In that you are truly wrong” said her grandfather in a funny voice. “You can think, walk, talk…” he paused, the girl still looked disappointed. “you can do everything you want”.</p>\r\n<p style=\"text-indent: 40px\">“My parents won’t let me do anything” answered the girl, obviously angry. “how old do I have to be in order to be free?” she asked, and looked at her grandfather’s eyes.</p>\r\n<p style=\"text-indent: 40px\">“You’ll be free whenever you decide to be” said him. </p>\r\n<p style=\"text-indent: 40px\">The sound of birds filled their ears and feathers were falling from the sky.</p>\r\n<p style=\"text-indent: 40px\">“What do you mean grandpa?”</p>\r\n<p style=\"text-indent: 40px\">“Do you see those birds?” he said, pointing at the sky. A little flock of birds were passing by. The girl nodded. “Imagine you have a lot of birds like those inside of you. Each of them represents one of the things you need to be free”.</p>\r\n<p style=\"text-indent: 40px\">The girl kept looking at the birds, amazed by the different colors and sizes. She smiled for a second, and then opened her mouth to speak: “What things?” she asked.</p>\r\n<p style=\"text-indent: 40px\">“See the blue one over there? That’s Wisdom. If you want to be free, you can’t stop learning, you need to understand a lot of things… you need answers. The blue bird is rare, not a lot of people can get one, but I’m sure you do.” Said the old man with a funny expression.</p>\r\n<p style=\"text-indent: 40px\">“Oh! Look at the yellow one!” He said before the girl could say anything. “That one is the most difficult one to find. Some people say is yellow because it’s as valuable as gold. Have any idea of what its name is?” He asked. The girl shook her head. “Well, that one is Forgiveness. In order to be free, you need to let go of all resentment, and forgive those who hurt you, including yourself. We are all human, never forget that”.</p>\r\n<p style=\"text-indent: 40px\">“The red one over there is the most common one, but somehow is the most difficult to accept. Every time a red bird appears everyone just try to kill it. But those who want to be free have to embrace it, and accept it as part of life... Have any idea on this one?” He said. The girl shook her head again. “Change” he answered “Change is the law of life, but is hard to accept. Being free also means to adapt, and to be greater than circumstances. Most adults in this world refuse to be free just because of this little red bird, did you know?”.</p>\r\n<p style=\"text-indent: 40px\">The girl had a little smile on her face. She thought of her parents, and wondered if they had sometime tried to kill their red birds.</p>\r\n<p style=\"text-indent: 40px\">“The green one. Right there, the loud one. That’s Courage. That one can be hard to understand now, but to be free you need to have courage, and you need to be strong enough to never give up. That’s why some people never find their place in this world; they can’t find their green bird, because this one is the one that gives you strength”.</p>\r\n<p style=\"text-indent: 40px\">“The one with the funny purplish color, only good people can have one of those, so there’s not a lot on this world. That one is Humility, and it’s very special. To be free you need to let go of all pretensions, otherwise you’ll fall into arrogance and greed, and that itself is a type of slavery”.</p>\r\n<p style=\"text-indent: 40px\">“The teal one is the most underestimated bird you’ll ever see. People usually take it for granted in youth, and struggle to find it while aging. Adults usually fail to remember that freedom is something you share. Actually, only kids like you can truly appreciate this bird… This one is Friendship. I highly recommend you to keep this one close, because it has a tendency to disappear when we grow old. ”</p>\r\n<p style=\"text-indent: 40px\">The girl thought of her parents once more, trying to remember if she had ever seen them with some real friends, but all they ever did was about work.</p>\r\n<p style=\"text-indent: 40px\">“That little wine one, the last of all, is my favorite. It’s the only one that actually has the answer to everything. That’s the one who’s going to tell you how you can be free in this world” Said the old man, and stared at his granddaughter.</p>\r\n<p style=\"text-indent: 40px\">“What’s its name?” asked the little girl, looking meditative.</p>\r\n<p style=\"text-indent: 40px\">“Self-awareness” he said after a long sigh. “This bird is the one who knows who you are, what you really want, and your purpose in this world. This bird is usually invisible for most people, but when you manage to find it, everything will be clear. But if you don’t find it, you’ll always be working for your surroundings”.</p>\r\n<p style=\"text-indent: 40px\">The girl looked at the horizon, thinking about what her grandfather had said. She frowned, she couldn’t help but feeling like something was missing.</p>\r\n<p style=\"text-indent: 40px\">“What about love?” She asked. “Love is not part of freedom?”.</p>\r\n<p style=\"text-indent: 40px\">“Of course it is. But the underestimated bird over there actually carries the most honest kind of love. Only true friendship can be a freedom kind of love. That’s why some people say that falling in love with your best friend is the best of luck”.</p>\r\n<p style=\"text-indent: 40px\">The little girl blushed for an instant, and then changed the topic.</p>\r\n<p style=\"text-indent: 40px\">“When will all of these birds make me free?” asked the girl without looking at her grandfather.</p>\r\n<p style=\"text-indent: 40px\">The seven birds were flying in circles in front of the porch. Colorful feather were falling to the ground. The girl thought they looked like they were dancing in mid air.</p>\r\n<p style=\"text-indent: 40px\">The old man laughed, and put his arm around the girl. He waved at the birds with his other hand, all of them flew away and disappeared in the now clear sky.</p>\r\n<p style=\"text-indent: 40px\">“When you let <i>them</i> free”.</p>\r\n', 'What does it take to be free', 'doc/images/sevenbirds.jpg', 'Sep 7th 2017', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL COMMENT 'id unico del usuario',
  `name` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'nombre del usuario',
  `user` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'usuario',
  `password` varchar(250) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT 'contrasena del usuario',
  `salt` varchar(250) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `user`, `password`, `salt`) VALUES
(1, 'manuel', 'manux_56', '$2a$10$X/p4xz1cyn9oGxBAda83FeuEiYQ.5DPlLk.uMRFmNT8F2LffUkPr.', '$2a$10$X/p4xz1cyn9oGxBAda83Fe');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'indice de la categoria', AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Id unico de la historia', AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT COMMENT 'id unico del usuario', AUTO_INCREMENT=2;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
