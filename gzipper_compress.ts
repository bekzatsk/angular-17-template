const { Compress } = require('gzipper');
const gzip = new Compress('./dist', null, { verbose: true, level: 6, include: ['js', 'css', 'html'] });
const brotli = new Compress('./dist', null, { verbose: true, brotli: true, level: 8, exclude: 'gz', include: ['js', 'css', 'html'] });

try {
    const gzipFiles = gzip.run();
    const brotliFiles = brotli.run();
    console.log('Compressed gzip files: ', gzipFiles);
    console.log('Compressed brotli files: ', brotliFiles);
} catch (err) {
    console.error(err);
}
