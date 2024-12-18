import { Util } from '../libs/util';

export class Conf {
  // #############################################
  // 本番UPフラグ
  // #############################################
  public static IS_BUILD = import.meta.env.PROD;

  // テスト用 パラメータ
  public static FLG_PARAM: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_LOW_FPS: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_SKIP_OP: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_DEBUG_TXT: boolean = true;
  public static FLG_STATS: boolean = Conf.IS_BUILD ? false : false;
  public static FLG_TEST: boolean = Conf.IS_BUILD ? false : location.href.includes('localhost');

  // パス
  public static PATH_ROOT = './';
  public static PATH_IMG: string = this.PATH_ROOT + 'assets/img/';

  // タッチデバイス
  public static USE_TOUCH: boolean = Util.isTouchDevice() && !Util.isWin();

  // ブレイクポイント
  public static BREAKPOINT = 950;

  // PSDサイズ
  public static LG_PSD_WIDTH = 1440;
  public static XS_PSD_WIDTH = 390;

  // 簡易版

  public static IS_WIN: boolean = Util.isWin();
  public static IS_FF: boolean = Util.isFF();
  public static IS_SF: boolean = Util.isSafari();
  public static IS_TOUCH_DEVICE: boolean = Util.isTouchDevice() && !Util.isWin();
  public static USE_MOVTEX = !Util.isSafari();

  constructor() {}
}
