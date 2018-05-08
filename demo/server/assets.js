const jsReg = /\.js(\?v=\w*)*$/;
const cssReg = /\.css(\?v=\w*)*$/;

export function getAssets(stats) {
  return {
    scripts: getAssetsOfType('js', stats),
    stylesheets: getAssetsOfType('css', stats),
  };
}

function getAssetsOfType(type, stats) {
  const reg = type === 'js' ? jsReg : cssReg;
  const vendorAssets = getAssetsForKey('vendor', stats, reg);
  const mainAssets = getAssetsForKey('main', stats, reg);

  if (type === 'js') {
    return vendorAssets.concat(mainAssets);
  }
  else {
    return vendorAssets.concat(mainAssets);
  }
}

function getAssetsForKey(key, stats, reg) {
  let assets = [];
  if (stats.assetsByChunkName && stats.assetsByChunkName[key]) {
    const files = stats.assetsByChunkName[key];
    // files could be either string or array, but we always want to return an array.
    if (typeof(files) === 'string') {
      assets = reg.test(files) ? [files] : [];
    }
    else if (files.filter) {
      assets = files.filter(asset => reg.test(asset));
    }
  }

  return assets;
}
