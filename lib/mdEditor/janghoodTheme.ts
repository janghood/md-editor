/**
 * @description
 * @author 阿怪
 * @date 2022/8/29 15:29
 * @version v1.0.0
 *
 * 江湖的业务千篇一律，复杂的代码好几百行。
 */
import {
  Emotion,
  hex2rgb,
  ThemeBorder,
  ThemeColor,
  ThemeFont,
  ThemeGlobal,
  ThemeIcon,
  ThemeManager,
  ThemeScrollbar,
  ThemeShadow,
  ThemeSize
} from "@milkdown/core";
import { Nord } from "@milkdown/theme-nord/src/nord";
import { getIcon } from "@milkdown/theme-nord/src/icon";
import { getStyle } from "@milkdown/theme-nord/src/style";
import { useAllPresetRenderer } from "@milkdown/theme-pack-helper";
import { font, size } from "@milkdown/theme-nord/src";


export const createTheme = () => (emotion: Emotion, manager: ThemeManager) => {
  const { css } = emotion;
  const colorSet = {
    shadow: '#5E616D',
    primary: '#861717',
    secondary: '#4A9992',
    neutral: '#2B333E',
    solid: '#5E616D',
    line: '#0F1423',
    background: Nord.nord6,
    surface: '#fff',
  };

  manager.set(ThemeColor, (options) => {
    if (!options) return;
    let [key, opacity] = options;
    const hex = colorSet[key];
    const rgb = hex2rgb(hex);
    if (!rgb) return;


    return `rgba(${rgb?.join(', ')}, ${opacity || 1})`;
  });

  manager.set(ThemeSize, (key) => {
    if (!key) return;
    return size[key];
  });

  manager.set(ThemeFont, (key) => {
    if (!key) return;
    return font[key].join(', ');
  });

  manager.set(ThemeScrollbar, ([direction = 'y', type = 'normal'] = ['y', 'normal'] as never) => {
    const main = manager.get(ThemeColor, ['secondary', 0.38]);
    const bg = manager.get(ThemeColor, ['secondary', 0.12]);
    const hover = manager.get(ThemeColor, ['secondary']);
    return css`
      scrollbar-width: thin;
      scrollbar-color: ${main} ${bg};
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        ${direction === 'y' ? 'width' : 'height'}: ${type === 'thin' ? 2 : 12}px;
        background-color: transparent;
      }

      &::-webkit-scrollbar-track {
        border-radius: 999px;
        background: transparent;
        border: 4px solid transparent;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 999px;
        background-color: ${main};
        border: ${type === 'thin' ? 0 : 4}px solid transparent;
        background-clip: content-box;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: ${hover};
      }
    `;
  });

  manager.set(ThemeShadow, () => {
    const lineWidth = manager.get(ThemeSize, 'lineWidth');
    const getShadow = (opacity: number) => manager.get(ThemeColor, ['shadow', opacity]);
    return css`
      box-shadow: 0 ${lineWidth} ${lineWidth} ${getShadow(0.14)}, 0 2px ${lineWidth} ${getShadow(0.12)},
      0 ${lineWidth} 3px ${getShadow(0.2)};
    `;
  });

  manager.set(ThemeBorder, (direction) => {
    const lineWidth = manager.get(ThemeSize, 'lineWidth');
    const line = manager.get(ThemeColor, ['line']);
    if (!direction) {
      return css`
        border: ${lineWidth} solid ${line};
      `;
    }
    return css`
      ${`border-${direction}`}: ${lineWidth} solid ${line};
    `;
  });

  manager.set(ThemeIcon, (icon) => {
    if (!icon) return;

    return getIcon(icon);
  });

  manager.set(ThemeGlobal, () => {
    getStyle(manager, emotion);
  });

  useAllPresetRenderer(manager, emotion);
};
