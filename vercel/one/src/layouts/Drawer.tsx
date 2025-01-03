import {
  type DrawerNavigationEventMap,
  type DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer'
import type { DrawerNavigationState, ParamListBase } from '@react-navigation/native'

import { withLayoutContext } from './withLayoutContext'

const DrawerNavigator = createDrawerNavigator().Navigator

export const Drawer = withLayoutContext<
  DrawerNavigationOptions,
  typeof DrawerNavigator,
  DrawerNavigationState<ParamListBase>,
  DrawerNavigationEventMap
>(DrawerNavigator)

export default Drawer
