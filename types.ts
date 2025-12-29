
export enum TabType {
  DASHBOARD = 'DASHBOARD',
  NETWORK = 'NETWORK',
  CHAT = 'CHAT',
  PROFILE = 'PROFILE'
}

export interface ModSettings {
  autoWinstreak: boolean;
  getTeamPro: boolean;
  getEnemyNoob: boolean;
  vpnLowTier: boolean;
  vpnLowNormal: boolean;
  bypassAntiBan: boolean;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}
