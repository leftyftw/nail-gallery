'use strict';

const glob = require('glob-promise');
const path = require('path');
const procdss = require('process');

const basePath = process.cwd();

const lister = {
    getFiles: (dir) => {
        
        const globstar = dir ? `src/nails/${dir}/**/*.{JPG,jpg,JPEG,jpeg,PNG,png,MOV,mov,mp4,MP4}` : `src/nails/**/*.{PNG,png,JPG,jpg,JPEG,jpeg,MOV,mov,mp4,MP4}`;
        return glob(globstar).then(x => x.filter(y => !y.includes('@eaDir')).map(y => y.substring(3)));
    },

    siteInfo: () => {
        const pFiles = lister.getFiles('collections');
        const sites = {};

        const addSite = (name, files) => {
            const site = {
                name: name,
                files: files.sort()
            };
            console.log('Adding site', site)
            sites[name] = site;
        }

        return pFiles.then( files => {
            console.log(`got ${files.length} files`)
            let currSite = null;
            let fileList = [];
            for (const f of files) {
                console.log('evaluating file', f)
                const siteName = f.split('/')[3];
                console.log('sitename', siteName)
                if (currSite != siteName) {
                    if (currSite) {
                        addSite(currSite, fileList);
                    }
                    currSite = siteName;
                    fileList = [];
                }

                fileList.push(f);
            }

            if (fileList.length) {
                addSite(currSite, fileList);
            }

            return sites;
        });
    }
}



module.exports = lister;
