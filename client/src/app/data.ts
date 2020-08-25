import {Card} from './models/card.model';
import {Set} from './models/set.model';

const setOfFruits = new Set('Fruit');
setOfFruits.addCard(new Card('Strawberry', 'Red fruits with a loot of seeds outside'));
setOfFruits.addCard(new Card('Banana', 'Berries with yellow color'));


const setOfFruitsInFrench = new Set('Fruits in French');
setOfFruitsInFrench.addCard(new Card('la fraise', 'the strawberry'));
setOfFruitsInFrench.addCard(new Card('le banane', 'the banana'));
setOfFruitsInFrench.addCard(new Card('le orange', 'the orange'));

export const data = [setOfFruits, setOfFruitsInFrench];

