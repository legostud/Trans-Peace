import svgstore from "svgstore";
import fs from "fs";
import * as R from "ramda";
import { Plugin } from 'vite';

/**
 * 
 * Usage: put svg's in svg.src directory.  eg. /img/svg-sprite/my-icon.svg
 *        They will be compiled into svg.filename. eg. /img/svg-sprite.svg
 *
 * In html: <svg><use xlink:href="/img/svg-sprite.svg#my-icon"></use></svg>
 *
 * In css: svg { fill: BlanchedAlmond; }
 */
interface svgSpriteType {
  src?: string,
  dest?: string,
  base?: string
  watch?: string[],
  filename?: string
}

export const svgSprite = (userConfig: svgSpriteType): Plugin => {
  const defaultConfig = {
    /**
     * src   : glob of files to copy
     * dest  : destination folder
     * base  : *optional https://github.com/gulpjs/gulp/blob/master/docs/API.md#optionsbase
     * watch : *optional, files to watch that will trigger a rerun when changed
     *          defaults to src
     */
    filename: "svg-sprite.svg",
  };

  const config = R.mergeDeepRight(defaultConfig, userConfig);

  if (!config.src || !config.dest) {
    throw new Error(
      `svgSprite requires src and dest. Was given \n${JSON.stringify(
        config,
        null,
        2,
      )}`,
    );
  }

  var sprites = svgstore({ inlineSvg: false });

  fs.readdir(config.src, function (err, filenames) {
    if (err) {
      // eslint-disable-next-line no-undef
      console.error(err);
      return;
    }

    filenames.forEach((filename) => {
      const name = filename.split(".")[0];
      sprites.add(name, fs.readFileSync(`${config.src}/${filename}`, "utf8"));
    });

    fs.writeFileSync(`${config.dest}/${config.filename}`, sprites.toString());
  });

  return {};
};
