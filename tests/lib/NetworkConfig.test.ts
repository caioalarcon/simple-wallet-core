import { DefaultNetworkConfig } from '../../src/lib/NetworkConfig';

describe('DefaultNetworkConfig', () => {
  test('getConfig returns testnet04 settings', () => {
    const configProvider = new DefaultNetworkConfig();
    const config = configProvider.getConfig();
    expect(config.chainwebId).toBe('testnet04');
    expect(config.chainId).toBe('1');
    expect(config.rpcHost).toContain('testnet');
    expect(typeof config.gasPrice).toBe('number');
    expect(typeof config.gasLimit).toBe('number');
  });
});
