// TODO: replace with real Atlas photo
import heroTrafficController from './hero_traffic_controller_1794397763875.jpg';
// TODO: replace with real Atlas photo
import heroCalmRoadworks from './hero_calm_roadworks_1794397765546.jpg';
// TODO: replace with real Atlas photo
import stillLifeConePlinth from './still_life_cone_plinth_1794397766719.jpg';
// TODO: replace with real Atlas photo
import operationsSiteAccess from './operations_site_access_1794397769573.jpg';
// TODO: replace with real Atlas photo
import eventsTrafficFlow from './events_traffic_flow_1794397769438.jpg';

export const ATLAS_IMAGES = {
  // TODO: replace with real Atlas photo
  heroTrafficController: heroTrafficController.src,
  // TODO: replace with real Atlas photo
  heroCalmRoadworks: heroCalmRoadworks.src,
  // TODO: replace with real Atlas photo
  stillLifeConePlinth: stillLifeConePlinth.src,
  // TODO: replace with real Atlas photo
  operationsSiteAccess: operationsSiteAccess.src,
  // TODO: replace with real Atlas photo
  eventsTrafficFlow: eventsTrafficFlow.src,
} as const;

export type AtlasImageKey = keyof typeof ATLAS_IMAGES;
