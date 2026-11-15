"use strict";

/* =========================================================
   Supabase — autenticação, base de dados e imagens
   ========================================================= */
const SUPABASE_URL = "https://indqnkkwhnsumiwxhydz.supabase.co";
// Chave pública (publishable): o acesso aos dados é protegido por RLS
const SUPABASE_KEY = "sb_publishable_Up_9cfg-zPtbTkwCPT3aiw_5dX2y5n-";
const BUCKET = "images";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
let session = null;

const ARTIST_FIELDS = {
  name: "name",
  realName: "real_name",
  genre: "genre",
  country: "country",
  contact: "contact",
  bio: "bio",
  spotify: "spotify",
  instagram: "instagram",
  youtube: "youtube",
  website: "website",
  photoPath: "photo_path",
};
const PROJECT_FIELDS = {
  artistId: "artist_id",
  title: "title",
  type: "type",
  releaseDate: "release_date",
  status: "status",
  label: "label",
  distributor: "distributor",
  genre: "genre",
  upc: "upc",
  coverPath: "cover_path",
  tracks: "tracks",
};
const SETTINGS_FIELDS = {
  upcPrefix: "upc_prefix",
  upcStart: "upc_start",
  isrcCountry: "isrc_country",
  isrcRegistrant: "isrc_registrant",
  isrcStart: "isrc_start",
};

// retorna um svg relacionado ao nome da distribuidora, se houver; caso contrário, retorna uma string vazia
function distributorLogo(name) {
  if (!name) return "";
  const width = 25,
    height = 25;
  const logos = {
    OFFStep: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="${width}pt" height="${height}pt" viewBox="0 0 1000.000000 982.000000" preserveAspectRatio="xMidYMid meet">

<g transform="translate(0.000000,982.000000) scale(0.100000,-0.100000)" fill="#ff8855" stroke="none">
<path d="M6405 8384 c-121 -20 -336 -79 -335 -93 1 -3 22 -46 48 -96 31 -59 52 -89 62 -88 8 2 58 15 110 29 128 35 351 44 484 20 360 -68 659 -297 815 -626 85 -178 124 -396 104 -577 -6 -54 -9 -99 -8 -101 5 -6 205 -45 209 -41 12 12 27 236 21 314 -45 620 -464 1104 -1070 1240 -69 16 -377 29 -440 19z"/>
<path d="M6434 7940 c-23 -5 -60 -14 -83 -20 l-42 -11 52 -100 c41 -78 56 -98 68 -93 9 4 66 9 126 12 129 5 200 -10 314 -66 214 -106 371 -360 371 -601 l0 -48 102 -21 c56 -12 104 -19 107 -16 3 3 5 49 4 103 -5 335 -203 643 -504 786 -124 59 -198 76 -344 80 -71 2 -149 0 -171 -5z"/>
<path d="M4275 7522 c-45 -15 -104 -42 -132 -60 -75 -48 -173 -157 -210 -232 -66 -134 -63 -80 -63 -1207 l0 -1023 290 0 290 0 0 1275 0 1275 -47 0 c-27 0 -84 -13 -128 -28z"/>
<path d="M4560 7080 l0 -470 295 0 295 0 0 203 c0 234 -12 305 -66 416 -86 175 -305 321 -481 321 l-43 0 0 -470z"/>
<path d="M6486 7491 c-4 -6 15 -53 43 -104 l50 -93 53 -13 c60 -13 118 -50 145 -90 9 -14 24 -53 33 -85 l17 -60 101 -21 102 -21 0 66 c0 169 -98 318 -258 393 -59 28 -79 32 -173 35 -71 3 -109 0 -113 -7z"/>
<path d="M5905 7135 c-175 -38 -332 -162 -406 -320 -62 -132 -59 -62 -59 -1417 l0 -1238 290 0 290 0 0 1495 0 1495 -27 -1 c-16 0 -55 -7 -88 -14z"/>
<path d="M6140 6676 l0 -476 290 0 290 0 0 208 c0 234 -11 305 -60 403 -93 189 -257 304 -472 335 l-48 6 0 -476z"/>
<path d="M2635 7044 c-263 -63 -485 -246 -596 -489 -89 -196 -102 -429 -37 -629 99 -303 349 -526 660 -590 42 -9 84 -16 93 -16 13 0 15 93 15 870 l0 870 -37 -1 c-21 0 -65 -7 -98 -15z"/>
<path d="M2880 6191 c0 -778 2 -871 15 -871 9 0 51 7 93 16 528 108 835 671 641 1174 -65 169 -209 339 -365 432 -91 54 -235 105 -323 114 l-61 7 0 -872z"/>
<path d="M4560 6215 l0 -275 290 0 290 0 0 275 0 275 -290 0 -290 0 0 -275z"/>
<path d="M6140 5820 c0 -148 0 -273 0 -277 0 -5 128 -8 285 -8 157 0 285 3 285 8 0 4 0 129 0 277 l0 270 -285 0 -285 0 0 -270z"/>
<path d="M7067 5143 c-4 -3 -7 -600 -7 -1325 l0 -1318 290 0 290 0 -2 1323 -3 1322 -281 3 c-154 1 -283 -1 -287 -5z"/>
<path d="M7750 4325 c0 -770 1 -815 18 -815 38 1 153 30 224 58 136 52 288 173 369 292 214 317 184 741 -73 1016 -133 142 -290 223 -500 259 l-38 6 0 -816z"/>
<path d="M2675 4765 c-174 -33 -315 -106 -449 -234 -181 -173 -274 -408 -263 -661 6 -135 25 -214 78 -328 88 -192 233 -338 422 -427 75 -36 194 -71 262 -77 l40 -3 3 873 c2 695 0 872 -10 871 -7 0 -44 -7 -83 -14z"/>
<path d="M2880 4420 l0 -360 378 2 377 3 3 358 2 357 -380 0 -380 0 0 -360z"/>
<path d="M3862 3488 l3 -1293 22 -65 c72 -208 245 -363 456 -406 42 -9 84 -13 92 -10 13 5 15 129 15 976 l0 970 380 0 380 0 0 295 0 295 -380 0 -380 0 0 265 0 265 -295 0 -296 0 3 -1292z"/>
<path d="M2880 3039 l0 -870 48 6 c197 27 376 119 518 267 269 278 320 701 127 1036 -89 153 -221 277 -378 352 -88 43 -218 80 -277 80 l-38 0 0 -871z"/>
<path d="M5915 3783 c-264 -56 -482 -226 -605 -470 -190 -381 -67 -859 285 -1103 119 -81 303 -150 404 -150 l31 0 0 870 0 870 -22 -1 c-13 0 -54 -7 -93 -16z"/>
<path d="M6140 3326 l0 -476 406 0 407 0 -6 108 c-3 59 -15 143 -27 187 -88 342 -380 601 -732 651 l-48 6 0 -476z"/>
<path d="M2020 2888 c0 -2 0 -163 -1 -358 l-1 -355 376 -3 376 -2 0 360 0 360 -375 0 c-206 0 -375 -1 -375 -2z"/>
<path d="M6140 2379 l0 -322 61 7 c88 9 232 60 323 114 173 103 335 308 385 487 l9 35 -389 0 -389 0 0 -321z"/>
<path d="M4560 2184 l0 -475 48 6 c260 35 452 203 517 450 11 45 15 113 15 277 l0 218 -290 0 -290 0 0 -476z"/>
</g>
</svg>`,
    SomVibe: `<svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="${width}pt" height="${height}pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#aa00aa" stroke="none">
              <path d="M2330 4739 c-567 -58 -1114 -341 -1478 -764 -264 -308 -431 -658 -504 -1058 -19 -103 -22 -158 -22 -357 0 -204 3 -251 23 -360 37 -198 93 -375 171 -547 l38 -82 89 24 c97 26 1242 331 1393 371 52 14 167 45 255 69 848 228 1607 426 1612 422 3 -4 0 -43 -7 -88 -57 -396 -308 -753 -667 -952 -163 -90 -95 -69 -1354 -405 -367 -97 -668 -181 -670 -187 -5 -17 187 -140 326 -209 198 -99 368 -158 580 -201 850 -171 1727 154 2250 835 380 497 528 1129 403 1735 -36 178 -106 384 -178 525 l-20 39 -47 -14 c-27 -7 -102 -28 -168 -45 -66 -17 -210 -56 -320 -85 -273 -73 -934 -250 -1075 -287 -63 -16 -178 -47 -255 -68 -157 -42 -1328 -354 -1418 -377 -32 -8 -61 -12 -64 -9 -11 11 28 204 59 300 107 321 355 609 658 761 111 55 192 84 380 134 85 23 299 80 475 127 176 47 412 109 525 139 113 30 294 79 403 108 109 29 199 57 200 62 4 18 -196 144 -338 214 -396 196 -823 274 -1255 230z"/>
              </g>
              </svg>`,
    OneRPM: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width}pt" height="${height}pt" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" xmlns:xlink="http://www.w3.org/1999/xlink">
<g><path style="opacity:0.97" fill="#f06321" d="M 782.5,-0.5 C 786.167,-0.5 789.833,-0.5 793.5,-0.5C 901.556,43.8847 962.556,124.218 976.5,240.5C 976.5,244.167 976.5,247.833 976.5,251.5C 972.186,261.658 964.519,265.491 953.5,263C 946.6,260.101 942.766,254.934 942,247.5C 935.802,174.255 904.302,114.755 847.5,69C 827.55,53.689 805.55,42.0223 781.5,34C 770.055,26.9822 767.555,17.4822 774,5.5C 776.671,3.09757 779.505,1.09757 782.5,-0.5 Z"/></g>
<g><path style="opacity:0.969" fill="#f06321" d="M 769.5,52.5 C 776.291,52.0409 782.624,53.5409 788.5,57C 868.726,94.7687 913.393,157.935 922.5,246.5C 920.9,260.249 913.234,265.749 899.5,263C 895.658,261.332 892.491,258.832 890,255.5C 884.697,196.046 858.864,147.88 812.5,111C 797.849,100.84 782.182,92.5067 765.5,86C 757.202,80.1044 754.702,72.271 758,62.5C 760.818,57.8388 764.651,54.5055 769.5,52.5 Z"/></g>
<g><path style="opacity:0.968" fill="#f06321" d="M 757.5,102.5 C 760.941,102.301 764.274,102.801 767.5,104C 825.672,130.518 860.172,175.351 871,238.5C 873.825,256.337 866.325,264.504 848.5,263C 845.098,261.6 842.264,259.433 840,256.5C 832.824,197.772 802.158,156.772 748,133.5C 739.402,119.329 742.568,108.995 757.5,102.5 Z"/></g>
<g><path style="opacity:0.985" fill="#000000" d="M 147.5,151.5 C 203.818,152.813 246.818,177.146 276.5,224.5C 275.395,225.892 274.061,227.059 272.5,228C 254.257,236.705 236.09,245.539 218,254.5C 193.246,223.248 161.746,213.081 123.5,224C 112.278,228.573 102.778,235.406 95,244.5C 93.4426,247.172 92.276,250.005 91.5,253C 94.725,263.893 101.725,271.226 112.5,275C 117.375,276.802 122.375,278.135 127.5,279C 152.981,280.904 177.648,277.238 201.5,268C 214.617,262.608 227.617,256.942 240.5,251C 280.821,229.34 321.821,209.006 363.5,190C 389.946,177.805 417.613,169.805 446.5,166C 472.457,162.438 497.124,166.438 520.5,178C 545.417,193.97 559.583,216.803 563,246.5C 563.693,279.166 564.36,311.833 565,344.5C 569.118,368.609 582.618,384.776 605.5,393C 618.785,394.143 631.452,391.81 643.5,386C 685.667,365.167 717.167,333.667 738,291.5C 743.605,278.273 745.271,264.606 743,250.5C 737.727,231.681 725.394,220.681 706,217.5C 681.473,221.691 668.64,236.191 667.5,261C 668.392,282.347 675.226,301.514 688,318.5C 692.122,324.291 696.622,329.791 701.5,335C 686.559,351.63 669.225,365.13 649.5,375.5C 608.906,333.14 594.739,283.14 607,225.5C 620.452,187.049 646.952,162.882 686.5,153C 739.852,146.923 778.018,168.09 801,216.5C 813.874,252.963 811.874,288.63 795,323.5C 770.901,371.264 736.068,409.097 690.5,437C 669.798,449.456 647.465,457.123 623.5,460C 583.025,462.342 550.525,447.508 526,415.5C 511.667,396.182 503.001,374.516 500,350.5C 498.781,318.517 498.114,286.517 498,254.5C 496.915,244.085 491.415,237.251 481.5,234C 471.252,231.094 460.919,230.761 450.5,233C 436.855,235.078 423.522,238.411 410.5,243C 391.567,250.801 372.9,259.135 354.5,268C 316.568,287.799 278.235,306.799 239.5,325C 200.854,341.941 160.521,348.608 118.5,345C 73.7429,339.552 43.9096,315.719 29,273.5C 22.9962,249.857 26.6629,227.857 40,207.5C 67.1279,172.351 102.961,153.684 147.5,151.5 Z"/></g>
<g><path style="opacity:0.954" fill="#000000" d="M 355.5,151.5 C 367.341,149.996 377.508,153.33 386,161.5C 388.78,164.392 390.446,167.726 391,171.5C 370.196,179.401 349.863,188.401 330,198.5C 325.137,175.07 333.637,159.403 355.5,151.5 Z"/></g>
<g><path style="opacity:0.981" fill="#000000" d="M -0.5,318.5 C -0.5,309.5 -0.5,300.5 -0.5,291.5C 2.21665,264.188 11.3833,239.188 27,216.5C 12.8012,256.211 20.6346,291.045 50.5,321C 56.7179,326.219 63.2179,331.052 70,335.5C 89.6108,378.391 122.777,396.224 169.5,389C 197.34,380.496 217.007,362.829 228.5,336C 252.434,326.534 275.767,315.701 298.5,303.5C 298.441,356.451 277.441,398.951 235.5,431C 183.793,464.563 130.46,467.229 75.5,439C 30.5653,411.318 5.23192,371.151 -0.5,318.5 Z"/></g>
<g><path style="opacity:0.988" fill="#000000" d="M 393.5,256.5 C 394.665,315.332 394.832,374.332 394,433.5C 388.812,453.345 375.978,462.178 355.5,460C 341.667,456.833 333.167,448.333 330,434.5C 329.333,385.5 329.333,336.5 330,287.5C 350.936,276.447 372.103,266.114 393.5,256.5 Z"/></g>
<g><path style="opacity:0.98" fill="#000000" d="M 872.5,330.5 C 893.149,329.23 905.982,338.563 911,358.5C 911.971,368.929 909.638,378.595 904,387.5C 883.385,423.116 853.218,446.283 813.5,457C 775.417,463.312 740.75,455.146 709.5,432.5C 728.677,418.995 746.011,403.329 761.5,385.5C 776.507,393.563 791.84,394.73 807.5,389C 827.333,379.833 841.833,365.333 851,345.5C 856.438,337.875 863.605,332.875 872.5,330.5 Z"/></g>
<g><path style="opacity:0.97" fill="#000000" d="M 483.5,474.5 C 488.25,474.27 492.584,475.437 496.5,478C 498.988,483.315 501.321,488.648 503.5,494C 520.462,495.244 537.462,495.911 554.5,496C 564.089,499.609 567.256,506.442 564,516.5C 562.221,520.612 559.388,523.778 555.5,526C 550.607,527.512 545.607,528.512 540.5,529C 530.327,537.828 522.494,548.328 517,560.5C 515.272,567.203 517.439,572.037 523.5,575C 536.846,575.167 550.179,575.667 563.5,576.5C 559.064,587.31 554.731,598.144 550.5,609C 534.793,609.901 519.127,609.568 503.5,608C 489.81,602.963 481.977,593.13 480,578.5C 478.499,565.67 481.499,554.003 489,543.5C 492.713,538.576 496.546,533.742 500.5,529C 496.129,528.172 491.795,528.339 487.5,529.5C 485.276,535.615 482.776,541.615 480,547.5C 472.06,559.075 462.726,560.408 452,551.5C 449.027,546.367 448.694,541.033 451,535.5C 457.857,516.792 465.523,498.459 474,480.5C 476.855,477.773 480.022,475.773 483.5,474.5 Z"/></g>
<g><path style="opacity:0.972" fill="#000000" d="M 542.5,712.5 C 540.167,712.5 537.833,712.5 535.5,712.5C 525.717,708.936 522.217,701.936 525,691.5C 549.39,629.054 574.056,566.721 599,504.5C 604.676,496.16 612.51,493.327 622.5,496C 626.275,497.442 629.108,499.942 631,503.5C 641.422,493.388 653.589,490.555 667.5,495C 678.318,500.165 685.152,508.665 688,520.5C 693.908,552.071 685.408,578.904 662.5,601C 652.799,607.259 642.133,610.093 630.5,609.5C 622.638,609.382 614.971,608.216 607.5,606C 604.688,604.023 602.022,601.856 599.5,599.5C 585.685,633.137 571.851,666.803 558,700.5C 554.356,706.665 549.189,710.665 542.5,712.5 Z M 636.5,523.5 C 648.866,520.717 655.199,525.551 655.5,538C 654.397,552.203 648.731,564.203 638.5,574C 627.336,579.234 618.336,576.9 611.5,567C 616.134,555.436 620.967,543.936 626,532.5C 628.84,528.673 632.34,525.673 636.5,523.5 Z"/></g>
<g><path style="opacity:0.97" fill="#000000" d="M 793.5,492.5 C 807.634,491.983 818.468,497.649 826,509.5C 838.236,495.755 853.403,490.588 871.5,494C 889.157,499.335 896.657,511.169 894,529.5C 888.754,544.907 882.92,560.074 876.5,575C 883.167,575.333 889.833,575.667 896.5,576C 909.959,577.47 914.459,584.636 910,597.5C 905.934,605.212 899.434,609.046 890.5,609C 878.167,609.667 865.833,609.667 853.5,609C 839.683,606.532 833.85,598.366 836,584.5C 841.77,567.856 847.937,551.356 854.5,535C 853.998,529.165 850.831,525.998 845,525.5C 833.608,528.555 825.608,535.555 821,546.5C 814.196,563.913 807.196,581.247 800,598.5C 792.594,610.889 782.427,614.056 769.5,608C 763.871,601.489 763.038,594.322 767,586.5C 774.131,568.94 780.964,551.273 787.5,533.5C 784.243,526.356 778.91,524.19 771.5,527C 763.948,531.225 758.448,537.392 755,545.5C 748.667,561.5 742.333,577.5 736,593.5C 732.606,602.898 726.106,608.732 716.5,611C 696.833,611.667 677.167,611.667 657.5,611C 670.127,603.207 679.793,592.707 686.5,579.5C 692.463,578.504 698.463,578.171 704.5,578.5C 713.166,554.672 722.333,531.006 732,507.5C 737.01,497.08 745.177,493.246 756.5,496C 761.4,497.902 764.567,501.402 766,506.5C 773.58,498.461 782.746,493.794 793.5,492.5 Z"/></g>
</svg>`,
  };
  return logos[name] || "";
}

const imageUrl = (path) =>
  path ? sb.storage.from(BUCKET).getPublicUrl(path).data.publicUrl : "";

function fromRow(row, fields) {
  const obj = { id: row.id, updatedAt: row.updated_at || null };
  for (const [k, col] of Object.entries(fields)) obj[k] = row[col] ?? "";
  return obj;
}

// As colunas de settings são NOT NULL: campos vazios vão como "" (e não null)
function settingsRow(s) {
  const row = { user_id: session.user.id };
  for (const [k, col] of Object.entries(SETTINGS_FIELDS))
    row[col] = s[k] ?? DEFAULT_SETTINGS[k];
  return row;
}

// Insere (novo) ou atualiza só se ninguém alterou o registo entretanto (updated_at)
async function saveRow(table, obj, fields, isNew) {
  const row = { id: obj.id, ...toRow(obj, fields) };
  if (isNew) return sb.from(table).insert(row).select().single();
  let q = sb.from(table).update(row).eq("id", obj.id);
  if (obj.updatedAt) q = q.eq("updated_at", obj.updatedAt);
  const res = await q.select().maybeSingle();
  if (!res.error && !res.data)
    return {
      data: null,
      error: {
        code: "STALE",
        message:
          "Este registo foi alterado noutro aparelho. Os dados foram recarregados — repete a edição.",
      },
    };
  return res;
}

// Lê todas as linhas (o Supabase devolve no máximo 1000 por pedido)
async function fetchAll(table) {
  const size = 1000;
  const rows = [];
  for (let from = 0; ; from += size) {
    const { data, error } = await sb
      .from(table)
      .select("*")
      .order("id")
      .range(from, from + size - 1);
    if (error) throw error;
    rows.push(...data);
    if (data.length < size) return rows;
  }
}
function toRow(obj, fields) {
  const row = {};
  for (const [k, col] of Object.entries(fields))
    row[col] = obj[k] === "" ? null : obj[k];
  return row;
}
const artistFromRow = (r) => {
  const a = fromRow(r, ARTIST_FIELDS);
  a.photo = imageUrl(a.photoPath);
  return a;
};
const projectFromRow = (r) => {
  const p = fromRow(r, PROJECT_FIELDS);
  p.cover = imageUrl(p.coverPath);
  p.tracks = Array.isArray(p.tracks) ? p.tracks : [];
  return p;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function uploadImage(blob) {
  const path = `${session.user.id}/${crypto.randomUUID()}.jpg`;
  const { error } = await sb.storage.from(BUCKET).upload(path, blob, {
    contentType: "image/jpeg",
    cacheControl: "31536000",
  });
  if (error) throw error;
  return path;
}

async function removeImages(paths) {
  const list = paths.filter(Boolean);
  if (list.length) await sb.storage.from(BUCKET).remove(list);
}

function errMsg(err) {
  if (err?.code === "23505")
    return "Este UPC já está atribuído a outro projeto.";
  if (/isrc_conflict/.test(err?.message || ""))
    return "Um dos ISRC já pertence a outra gravação (outro título). Gera um novo ISRC.";
  if (/isrc_duplicate_in_project/.test(err?.message || ""))
    return "Há ISRC repetidos neste projeto.";
  const map = {
    "Invalid login credentials": "Email ou palavra-passe incorretos.",
    "Email not confirmed": "Confirma primeiro o email que te enviámos.",
  };
  return map[err?.message] || err?.message || "Ocorreu um erro.";
}

/* =========================================================
   Estado e utilitários
   ========================================================= */
const DEFAULT_SETTINGS = {
  upcPrefix: "",
  upcStart: 1,
  isrcCountry: "PT",
  isrcRegistrant: "",
  isrcStart: 1,
};
const TYPES = ["Single", "EP", "Álbum", "Compilação"];
const STATUSES = ["Rascunho", "Agendado", "Lançado"];

const state = {
  artists: [],
  projects: [],
  settings: { ...DEFAULT_SETTINGS },
  selected: "all",
  query: "",
  typeFilter: "",
};

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const initials = (name) =>
  String(name || "?")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
const yearOf = (date) => (date ? date.slice(0, 4) : "");
const artistById = (id) => state.artists.find((a) => a.id === id);
const projectsOf = (artistId) =>
  state.projects.filter((p) => p.artistId === artistId);
const sortProjects = (list) =>
  [...list].sort(
    (a, b) =>
      (b.releaseDate || "").localeCompare(a.releaseDate || "") ||
      a.title.localeCompare(b.title),
  );
const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? u : "");
const todayIso = () => new Date().toLocaleDateString("sv-SE");
// "Agendado" passa a "Lançado" quando a data de lançamento chega
const statusOf = (p) =>
  p.status === "Agendado" && p.releaseDate && p.releaseDate <= todayIso()
    ? "Lançado"
    : p.status;

let toastTimer;
function toast(msg, kind = "") {
  const el = $("#toast");
  el.textContent = msg;
  el.className = `toast show ${kind}`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(`Copiado: ${text}`, "ok");
  } catch {
    toast("Não foi possível copiar.", "error");
  }
}

function download(filename, content, type) {
  const url = URL.createObjectURL(
    content instanceof Blob ? content : new Blob([content], { type }),
  );
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Desativa o botão de submissão enquanto a operação corre
async function busy(form, fn) {
  const buttons = form.querySelectorAll("button[type=submit]");
  buttons.forEach((b) => (b.disabled = true));
  try {
    return await fn();
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}

// Redimensiona a imagem antes do envio para poupar espaço e largura de banda
function readImage(file, max) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith("image/"))
      return reject(new Error("O ficheiro tem de ser uma imagem."));
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * scale);
      c.height = Math.round(img.height * scale);
      const ctx = c.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(
        (blob) =>
          blob
            ? resolve(blob)
            : reject(new Error("Não foi possível processar a imagem.")),
        "image/jpeg",
        0.88,
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Não foi possível ler a imagem."));
    };
    img.src = url;
  });
}

/* =========================================================
   UPC-A
   ========================================================= */
function upcCheckDigit(d11) {
  let sum = 0;
  for (let i = 0; i < 11; i++) sum += Number(d11[i]) * (i % 2 === 0 ? 3 : 1);
  return (10 - (sum % 10)) % 10;
}

const isValidUpc = (code) => /^\d+$/.test(code);

function nextUpc(exclude = []) {
  const prefix = state.settings.upcPrefix;
  if (!/^\d{6,10}$/.test(prefix))
    throw new Error("Define o prefixo GS1 (6 a 10 dígitos) nas Definições.");
  const refLen = 11 - prefix.length;
  let max = (Number(state.settings.upcStart) || 1) - 1;
  for (const code of [...state.projects.map((p) => p.upc), ...exclude]) {
    if (code && code.length === 12 && code.startsWith(prefix))
      max = Math.max(max, Number(code.slice(prefix.length, 11)));
  }
  const ref = String(max + 1);
  if (ref.length > refLen)
    throw new Error("Não há mais referências disponíveis para este prefixo.");
  const d11 = prefix + ref.padStart(refLen, "0");
  return d11 + upcCheckDigit(d11);
}

const UPC_L = [
  "0001101",
  "0011001",
  "0010011",
  "0111101",
  "0100011",
  "0110001",
  "0101111",
  "0111011",
  "0110111",
  "0001011",
];

function upcBarcodeSvg(code) {
  if (!isValidUpc(code)) return "";
  const invert = (p) => p.replace(/./g, (b) => (b === "1" ? "0" : "1"));
  let bits = "101";
  for (let i = 0; i < 6; i++) bits += UPC_L[code[i]];
  bits += "01010";
  for (let i = 6; i < 12; i++) bits += invert(UPC_L[code[i]]);
  bits += "101";

  const m = 2; // largura de um módulo
  const q = 11; // zona de silêncio (módulos)
  const h = 70;
  const top = 6;
  const isLong = (i) => i < 10 || (i >= 45 && i < 50) || i >= 85; // guardas + 1º e último dígito
  const width = (95 + q * 2) * m;
  const height = top + h + 22;

  let bars = "";
  for (let i = 0; i < 95; i++) {
    if (bits[i] === "1")
      bars += `<rect x="${(q + i) * m}" y="${top}" width="${m}" height="${isLong(i) ? h + 10 : h}"/>`;
  }
  const ty = top + h + 16;
  let text = `<text x="${(q - 2) * m}" y="${ty}" text-anchor="end">${code[0]}</text>`;
  for (let k = 0; k < 5; k++)
    text += `<text x="${(q + 10 + 7 * k + 3.5) * m}" y="${ty}" text-anchor="middle">${code[k + 1]}</text>`;
  for (let k = 0; k < 5; k++)
    text += `<text x="${(q + 50 + 7 * k + 3.5) * m}" y="${ty}" text-anchor="middle">${code[k + 6]}</text>`;
  text += `<text x="${(q + 97) * m}" y="${ty}" text-anchor="start">${code[11]}</text>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">${bars}</g><g fill="#000" font-family="monospace" font-size="15">${text}</g></svg>`;
}

/* =========================================================
   ISRC — CC-XXX-AA-NNNNN (guardado sem hífens)
   ========================================================= */
const ISRC_RE = /^[A-Z]{2}[A-Z0-9]{3}\d{7}$/;
const normIsrc = (v) =>
  String(v || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
const fmtIsrc = (c) =>
  c && c.length === 12
    ? `${c.slice(0, 2)}-${c.slice(2, 5)}-${c.slice(5, 7)}-${c.slice(7)}`
    : c || "";
const allIsrcs = () =>
  state.projects.flatMap((p) => p.tracks.map((t) => t.isrc)).filter(Boolean);

function nextIsrc(exclude = []) {
  const { isrcCountry, isrcRegistrant } = state.settings;
  if (
    !/^[A-Z]{2}$/.test(isrcCountry) ||
    !/^[A-Z0-9]{3}$/.test(isrcRegistrant)
  ) {
    throw new Error(
      "Define o país e o código de registante ISRC nas Definições.",
    );
  }
  const stem =
    isrcCountry + isrcRegistrant + String(new Date().getFullYear()).slice(-2);
  const codes = [...allIsrcs(), ...exclude].filter(Boolean);
  // A designação inicial só vale para o primeiro ano; em anos novos a sequência recomeça em 1
  const usedBefore = codes.some(
    (c) => c.startsWith(isrcCountry + isrcRegistrant) && !c.startsWith(stem),
  );
  let max = usedBefore ? 0 : (Number(state.settings.isrcStart) || 1) - 1;
  for (const code of codes) {
    if (code.startsWith(stem)) max = Math.max(max, Number(code.slice(7)));
  }
  if (max + 1 > 99999)
    throw new Error("Atingiste o limite de 99999 ISRC para este ano.");
  return stem + String(max + 1).padStart(5, "0");
}

/* =========================================================
   Render — barra lateral
   ========================================================= */
function avatarHtml(artist, cls = "") {
  return `<span class="avatar ${cls}">${artist.photo ? `<img src="${esc(artist.photo)}" alt="">` : esc(initials(artist.name))}</span>`;
}

function renderSidebar() {
  const q = state.query.toLowerCase();
  const artists = [...state.artists]
    .filter((a) => !q || a.name.toLowerCase().includes(q))
    .sort((a, b) => a.name.localeCompare(b.name));
  const total = state.projects.length;

  let html = `
    <button class="artist-item ${state.selected === "all" ? "active" : ""}" data-select="all">
      <span class="avatar all">★</span>
      <span class="info"><strong>Biblioteca completa</strong><small>${total} ${total === 1 ? "projeto" : "projetos"}</small></span>
    </button>
    <div class="sidebar-title">Artistas (${state.artists.length})</div>`;

  html += artists
    .map((a) => {
      const n = projectsOf(a.id).length;
      return `
      <button class="artist-item ${state.selected === a.id ? "active" : ""}" data-select="${a.id}">
        ${avatarHtml(a)}
        <span class="info"><strong>${esc(a.name)}</strong><small>${n} ${n === 1 ? "projeto" : "projetos"}</small></span>
      </button>`;
    })
    .join("");

  $("#artistList").innerHTML = html;
}

/* =========================================================
   Render — área principal
   ========================================================= */
function projectCard(p, showArtist) {
  const artist = artistById(p.artistId);
  const sub = [
    showArtist && artist ? artist.name : "",
    yearOf(p.releaseDate),
    `${p.tracks.length} ${p.tracks.length === 1 ? "faixa" : "faixas"}`,
  ]
    .filter(Boolean)
    .join(" · ");
  return `
    <article class="project-card" tabindex="0" data-open="${p.id}">
      <div class="cover">
        ${p.cover ? `<img src="${esc(p.cover)}" alt="Capa de ${esc(p.title)}" loading="lazy">` : esc(initials(p.title))}
        <span class="badge">${esc(p.type)}</span>
        <span class="badge status st-${esc(statusOf(p))}">${esc(statusOf(p))}</span>
      </div>
      <div class="meta">
        <h3 title="${esc(p.title)}">${esc(p.title)}</h3>
        <p>${esc(sub)}</p>
        <code>${p.upc ? `UPC ${esc(p.upc)}` : "sem UPC"}</code>
      </div>
    </article>`;
}

function typeChips(list) {
  const present = TYPES.filter((t) => list.some((p) => p.type === t));
  if (present.length < 2) return "";
  return `<div class="chips">
    <button class="chip ${state.typeFilter ? "" : "active"}" data-type="">Todos</button>
    ${present.map((t) => `<button class="chip ${state.typeFilter === t ? "active" : ""}" data-type="${t}">${t}</button>`).join("")}
  </div>`;
}

function gridHtml(list, showArtist, emptyMsg) {
  const filtered = state.typeFilter
    ? list.filter((p) => p.type === state.typeFilter)
    : list;
  if (!filtered.length) return `<div class="empty"><p>${emptyMsg}</p></div>`;
  return `<div class="project-grid">${sortProjects(filtered)
    .map((p) => projectCard(p, showArtist))
    .join("")}</div>`;
}

function matchesQuery(p, q) {
  const artist = artistById(p.artistId);
  const hay = [
    p.title,
    p.upc,
    p.label,
    p.distributor,
    artist?.name,
    ...p.tracks.flatMap((t) => [t.title, t.feat, t.isrc, fmtIsrc(t.isrc)]),
  ]
    .join(" ")
    .toLowerCase();
  const compact = q.replace(/-/g, "");
  return hay.includes(q) || (compact !== "" && hay.includes(compact));
}

function renderMain() {
  const main = $("#main");

  if (!state.artists.length) {
    main.innerHTML = `
      <div class="empty">
        <h2>Ainda não há artistas</h2>
        <p>Cria o primeiro artista e começa a montar a biblioteca de lançamentos.<br>
        Antes de gerar códigos, configura o prefixo UPC e o registante ISRC em <strong>Definições</strong>.</p>
        <button class="btn primary" data-action="new-artist">+ Criar artista</button>
      </div>`;
    return;
  }

  const q = state.query.trim().toLowerCase();
  if (q) {
    const results = state.projects.filter((p) => matchesQuery(p, q));
    main.innerHTML = `
      <div class="section-head"><h2>Resultados para “${esc(state.query)}” (${results.length})</h2></div>
      ${gridHtml(results, true, "Nenhum projeto encontrado.")}`;
    return;
  }

  if (state.selected === "all") {
    const tracks = state.projects.reduce((n, p) => n + p.tracks.length, 0);
    main.innerHTML = `
      <div class="artist-header">
        <span class="avatar all">★</span>
        <div class="details">
          <h2>Biblioteca completa</h2>
          <div class="stats">
            <div><strong>${state.artists.length}</strong><span>artistas</span></div>
            <div><strong>${state.projects.length}</strong><span>projetos</span></div>
            <div><strong>${tracks}</strong><span>faixas</span></div>
            <div><strong>${state.projects.filter((p) => statusOf(p) === "Lançado").length}</strong><span>lançados</span></div>
          </div>
        </div>
      </div>
      <div class="section-head"><h2>Todos os projetos</h2>${typeChips(state.projects)}</div>
      ${gridHtml(state.projects, true, "Ainda não há projetos. Escolhe um artista e adiciona o primeiro.")}`;
    return;
  }

  const a = artistById(state.selected);
  if (!a) {
    state.selected = "all";
    return renderMain();
  }
  const list = projectsOf(a.id);
  const tracks = list.reduce((n, p) => n + p.tracks.length, 0);
  const links = [
    ["Spotify", a.spotify],
    ["Instagram", a.instagram],
    ["YouTube", a.youtube],
    ["Website", a.website],
  ]
    .filter(([, u]) => safeUrl(u))
    .map(
      ([label, u]) =>
        `<a href="${esc(u)}" target="_blank" rel="noopener">${label}</a>`,
    )
    .join("");
  const sub = [a.realName, a.genre, a.country, a.contact]
    .filter(Boolean)
    .map(esc)
    .join(" · ");

  main.innerHTML = `
    <div class="artist-header">
      ${avatarHtml(a)}
      <div class="details">
        <h2>${esc(a.name)}</h2>
        ${sub ? `<p class="sub">${sub}</p>` : ""}
        ${a.bio ? `<p class="bio">${esc(a.bio)}</p>` : ""}
        ${links ? `<div class="links">${links}</div>` : ""}
        <div class="stats">
          <div><strong>${list.length}</strong><span>projetos</span></div>
          <div><strong>${tracks}</strong><span>faixas</span></div>
          <div><strong>${list.filter((p) => p.upc).length}</strong><span>com UPC</span></div>
        </div>
      </div>
      <div class="header-actions">
        <button class="btn primary" data-action="new-project">+ Projeto</button>
        <button class="btn ghost" data-action="edit-artist">Editar</button>
        <button class="btn danger" data-action="delete-artist">Eliminar</button>
      </div>
    </div>
    <div class="section-head"><h2>Discografia</h2>${typeChips(list)}</div>
    ${gridHtml(list, false, "Este artista ainda não tem projetos.")}`;
}

function render() {
  renderSidebar();
  renderMain();
}

/* =========================================================
   Artista — formulário
   ========================================================= */
let artistDraft = null;

function setPreview(el, src, fallback) {
  el.innerHTML = src ? `<img src="${esc(src)}" alt="">` : fallback;
}

function openArtistForm(artist) {
  artistDraft = artist ? { ...artist } : { id: null, photo: "", photoPath: "" };
  const f = $("#artistForm");
  f.reset();
  for (const k of [
    "name",
    "realName",
    "genre",
    "country",
    "contact",
    "bio",
    "spotify",
    "instagram",
    "youtube",
    "website",
  ]) {
    f.elements[k].value = artistDraft[k] || "";
  }
  $("#artistFormTitle").textContent = artist
    ? "Editar artista"
    : "Novo artista";
  setPreview($("#artistPhotoPreview"), artistDraft.photo, "Foto");
  $("#btnRemovePhoto").hidden = !artistDraft.photo;
  $("#artistDialog").dataset.dirty = "";
  $("#artistDialog").showModal();
}

// Dialogs com alterações por guardar pedem confirmação antes de fechar
function closeDialog(dlg, force = false) {
  if (
    !force &&
    dlg.dataset.dirty &&
    !confirm("Descartar as alterações por guardar?")
  )
    return;
  dlg.dataset.dirty = "";
  dlg.close();
}

async function reloadData() {
  try {
    await loadAll();
    render();
  } catch (err) {
    toast(errMsg(err), "error");
  }
}

async function saveArtist(e) {
  e.preventDefault();
  const f = e.target.elements;
  const a = { ...artistDraft };
  for (const k of [
    "name",
    "realName",
    "genre",
    "country",
    "contact",
    "bio",
    "spotify",
    "instagram",
    "youtube",
    "website",
  ]) {
    a[k] = f[k].value.trim();
  }
  if (!a.name) return toast("O nome artístico é obrigatório.", "error");
  const isNew = !a.id;
  a.id ||= crypto.randomUUID();

  await busy(e.target, async () => {
    const oldPath = artistDraft.photoPath;
    let newPath = null;
    try {
      if (a.photoBlob) newPath = a.photoPath = await uploadImage(a.photoBlob);
      else if (a.removePhoto) a.photoPath = "";
      const { data, error } = await saveRow("artists", a, ARTIST_FIELDS, isNew);
      if (error) throw error;
      if (oldPath && a.photoPath !== oldPath) removeImages([oldPath]);

      const saved = artistFromRow(data);
      state.artists = isNew
        ? [...state.artists, saved]
        : state.artists.map((x) => (x.id === saved.id ? saved : x));
      state.selected = saved.id;
      closeDialog($("#artistDialog"), true);
      render();
      toast(isNew ? "Artista criado." : "Artista atualizado.", "ok");
    } catch (err) {
      if (newPath) removeImages([newPath]);
      toast(errMsg(err), "error");
      if (err.code === "STALE") reloadData();
    }
  });
}

async function deleteArtist() {
  const a = artistById(state.selected);
  if (!a) return;
  const list = projectsOf(a.id);
  const msg = list.length
    ? `Eliminar "${a.name}" e os seus ${list.length} projetos? Esta ação não pode ser desfeita.`
    : `Eliminar "${a.name}"?`;
  if (!confirm(msg)) return;
  // Os projetos são apagados em cascata pela base de dados
  const { error } = await sb.from("artists").delete().eq("id", a.id);
  if (error) return toast(errMsg(error), "error");
  removeImages([a.photoPath, ...list.map((p) => p.coverPath)]);
  state.projects = state.projects.filter((p) => p.artistId !== a.id);
  state.artists = state.artists.filter((x) => x.id !== a.id);
  state.selected = "all";
  render();
  toast("Artista eliminado.");
}

/* =========================================================
   Projeto — formulário
   ========================================================= */
let draft = null;

const emptyTrack = () => ({ title: "", feat: "", duration: "", isrc: "" });

function fillSelect(sel, options, value) {
  sel.innerHTML = options
    .map(([v, label]) => `<option value="${esc(v)}">${esc(label)}</option>`)
    .join("");
  sel.value = value;
}

function openProjectForm(project, artistId) {
  draft = project
    ? structuredClone(project)
    : {
        id: null,
        artistId,
        title: "",
        type: "Single",
        releaseDate: "",
        status: "Rascunho",
        label: "",
        genre: "",
        distributor: "",
        upc: "",
        cover: "",
        coverPath: "",
        tracks: [emptyTrack()],
      };
  if (!draft.tracks.length) draft.tracks.push(emptyTrack());

  const f = $("#projectForm");
  f.reset();
  const artists = [...state.artists].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
  fillSelect(
    f.elements.artistId,
    artists.map((a) => [a.id, a.name]),
    draft.artistId,
  );
  fillSelect(
    f.elements.type,
    TYPES.map((t) => [t, t]),
    draft.type,
  );
  fillSelect(
    f.elements.status,
    STATUSES.map((s) => [s, s]),
    draft.status,
  );
  for (const k of [
    "title",
    "releaseDate",
    "label",
    "genre",
    "upc",
    "distributor",
  ])
    f.elements[k].value = draft[k] || "";
  if (!draft.genre && !project)
    f.elements.genre.value = artistById(artistId)?.genre || "";

  $("#projectFormTitle").textContent = project
    ? "Editar projeto"
    : "Novo projeto";
  setPreview(
    $("#coverPreview"),
    draft.cover,
    "Capa<br><small>clicar ou arrastar</small>",
  );
  updateUpcStatus();
  renderTracks();
  $("#btnRemoveCover").hidden = !draft.cover;
  $("#projectDialog").dataset.dirty = "";
  $("#projectDialog").showModal();
}

// Atualiza projetos antes de gerar códigos, para não repetir os gerados noutro aparelho
async function refreshProjects() {
  try {
    state.projects = (await fetchAll("projects")).map(projectFromRow);
  } catch {
    /* sem rede: segue com os dados em memória; a base de dados valida na gravação */
  }
}

function updateUpcStatus() {
  const input = $("#projectForm").elements.upc;
  // Remove tudo o que não for número em tempo real
  const code = input.value.replace(/\D/g, "");
  if (input.value !== code) input.value = code;

  const status = $("#upcStatus");
  let msg = "";
  let cls = "hint";

  if (!code) {
    msg = "Opcional.";
  } else if (state.projects.some((p) => p.id !== draft.id && p.upc === code)) {
    msg = "Este UPC já pertence a outro projeto.";
    cls += " bad";
  } else {
    msg = "UPC válido.";
    cls += " ok";
  }
  status.textContent = msg;
  status.className = cls;

  // O código de barras em SVG só é gerado se tiver exatamente 12 dígitos, caso contrário a imagem é ocultada
  const barcodeBox = $("#upcBarcode");
  if (code.length >= 12) {
    barcodeBox.innerHTML = upcBarcodeSvg(code);
  } else {
    barcodeBox.innerHTML = "";
  }
}

function renderTracks() {
  const n = draft.tracks.length;
  $("#trackList").innerHTML = draft.tracks
    .map(
      (t, i) => `
    <div class="track-row" data-i="${i}">
      <span class="track-n">${i + 1}</span>
      <input data-k="title" placeholder="Título da faixa" value="${esc(t.title)}" aria-label="Título da faixa ${i + 1}">
      <input data-k="feat" placeholder="Participações (feat.)" value="${esc(t.feat)}" aria-label="Participações">
      <input data-k="duration" class="dur" placeholder="3:45" value="${esc(t.duration)}" aria-label="Duração">
      <div class="code-input">
        <input data-k="isrc" class="mono" placeholder="ISRC" maxlength="15" value="${esc(fmtIsrc(t.isrc))}" aria-label="ISRC">
        <button type="button" class="btn small" data-action="gen-isrc" data-i="${i}">Gerar</button>
      </div>
      <div class="track-tools">
        <button type="button" class="icon-btn" data-action="track-up" data-i="${i}" title="Subir" ${i === 0 ? "disabled" : ""}>↑</button>
        <button type="button" class="icon-btn" data-action="track-down" data-i="${i}" title="Descer" ${i === n - 1 ? "disabled" : ""}>↓</button>
        <button type="button" class="icon-btn" data-action="track-del" data-i="${i}" title="Remover">✕</button>
      </div>
    </div>`,
    )
    .join("");
}

function syncTracks() {
  document.querySelectorAll("#trackList .track-row").forEach((row) => {
    const t = draft.tracks[row.dataset.i];
    row.querySelectorAll("[data-k]").forEach((inp) => {
      t[inp.dataset.k] =
        inp.dataset.k === "isrc" ? normIsrc(inp.value) : inp.value.trim();
    });
  });
}

async function genIsrcFor(indexes) {
  syncTracks();
  await refreshProjects();
  try {
    // Exclui o próprio projeto: os ISRC dele vêm do rascunho
    const saved = state.projects;
    state.projects = saved.filter((p) => p.id !== draft.id);
    try {
      for (const i of indexes) {
        const others = draft.tracks
          .filter((_, j) => j !== i)
          .map((t) => t.isrc);
        draft.tracks[i].isrc = nextIsrc(others);
      }
    } finally {
      state.projects = saved;
    }
    renderTracks();
    if (indexes.length)
      toast(
        indexes.length === 1
          ? `ISRC gerado: ${fmtIsrc(draft.tracks[indexes[0]].isrc)}`
          : `${indexes.length} ISRC gerados.`,
        "ok",
      );
    else toast("Todas as faixas já têm ISRC.");
  } catch (err) {
    toast(err.message, "error");
  }
}

async function saveProject(e) {
  e.preventDefault();
  syncTracks();
  const f = e.target.elements;
  const p = { ...draft };
  for (const k of [
    "artistId",
    "title",
    "type",
    "releaseDate",
    "distributor",
    "status",
    "label",
    "genre",
  ])
    p[k] = f[k].value.trim();
  p.upc = f.upc.value.replace(/\D/g, "");
  p.tracks = draft.tracks
    .filter((t) => t.title || t.isrc || t.feat || t.duration)
    .map(({ title, feat, duration, isrc }) => ({
      title,
      feat,
      duration,
      isrc,
    }));

  if (!p.title) return toast("O título é obrigatório.", "error");
  if (!artistById(p.artistId)) return toast("Escolhe um artista.", "error");
  if (p.upc && !isValidUpc(p.upc))
    return toast("UPC inválido — verifica o dígito de controlo.", "error");
  const upcOwner = state.projects.find(
    (o) => o.id !== p.id && o.upc && o.upc === p.upc,
  );
  if (upcOwner)
    return toast(`Este UPC já está atribuído a "${upcOwner.title}".`, "error");

  const seen = new Set();
  for (const [i, t] of p.tracks.entries()) {
    if (!t.title) return toast(`A faixa ${i + 1} precisa de título.`, "error");
    if (!t.isrc) continue;
    if (!ISRC_RE.test(t.isrc))
      return toast(`ISRC inválido na faixa ${i + 1}: ${t.isrc}`, "error");
    if (seen.has(t.isrc))
      return toast(`ISRC repetido neste projeto: ${fmtIsrc(t.isrc)}`, "error");
    seen.add(t.isrc);
    // A mesma gravação pode sair em vários lançamentos (ex.: single e álbum) com o mesmo ISRC
    for (const o of state.projects) {
      if (o.id === p.id) continue;
      const same = o.tracks.find((x) => x.isrc === t.isrc);
      if (same && same.title.toLowerCase() !== t.title.toLowerCase()) {
        return toast(
          `O ISRC ${fmtIsrc(t.isrc)} já pertence a "${same.title}" em "${o.title}". Um ISRC identifica uma única gravação.`,
          "error",
        );
      }
    }
  }

  const isNew = !p.id;
  p.id ||= crypto.randomUUID();

  await busy(e.target, async () => {
    const oldPath = draft.coverPath;
    let newPath = null;
    try {
      if (p.coverBlob) newPath = p.coverPath = await uploadImage(p.coverBlob);
      else if (p.removeCover) p.coverPath = "";
      const { data, error } = await saveRow(
        "projects",
        p,
        PROJECT_FIELDS,
        isNew,
      );
      if (error) throw error;
      if (oldPath && p.coverPath !== oldPath) removeImages([oldPath]);

      const saved = projectFromRow(data);
      state.projects = isNew
        ? [...state.projects, saved]
        : state.projects.map((x) => (x.id === saved.id ? saved : x));
      state.selected = saved.artistId;
      closeDialog($("#projectDialog"), true);
      render();
      toast(
        isNew ? "Projeto adicionado à biblioteca." : "Projeto atualizado.",
        "ok",
      );
    } catch (err) {
      if (newPath) removeImages([newPath]);
      toast(errMsg(err), "error");
      if (err.code === "STALE") reloadData();
    }
  });
}

/* =========================================================
   Projeto — detalhe
   ========================================================= */
function codeLine(value, display = value) {
  return `<span class="code-line"><code>${esc(display)}</code><button class="icon-btn" data-copy="${esc(display)}" title="Copiar">⧉</button></span>`;
}

function openProjectView(id) {
  const p = state.projects.find((x) => x.id === id);
  if (!p) return;
  const artist = artistById(p.artistId);
  const date = p.releaseDate
    ? new Date(p.releaseDate + "T00:00").toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  $("#viewBody").innerHTML = `
    <div class="view">
      <div>
        <div class="cover">${p.cover ? `<img src="${esc(p.cover)}" alt="Capa de ${esc(p.title)}">` : esc(initials(p.title))}</div>
        ${p.cover ? `<button class="btn small ghost" style="margin-top:8px" data-action="download-cover" data-id="${p.id}">Descarregar capa</button>` : ""}
      </div>
      <div>
        <span class="badge status st-${esc(statusOf(p))}">${esc(statusOf(p))}</span>
        <h2 style="margin-top:8px">${esc(p.title)}</h2>
        <p class="sub">${esc(artist?.name || "—")} · ${esc(p.type)}</p>
        <dl class="facts">
          <dt>Lançamento</dt><dd>${esc(date)}</dd>
          <dt>Editora</dt><dd>${esc(p.label || "—")}</dd>
          <dt>Género</dt><dd>${esc(p.genre || "—")}</dd>
          <dt>Distribuidora</dt><dd title="${esc(p.distributor || "—")}">${distributorLogo(esc(p.distributor)) || "—"}</dd>
          <dt>UPC</dt><dd>${p.upc ? codeLine(p.upc) : "—"}</dd>
        </dl>
        ${
          p.upc
            ? `<div class="barcode-box">${upcBarcodeSvg(p.upc)}</div>
          <button class="btn small ghost" style="margin-top:6px" data-action="download-barcode" data-id="${p.id}">Descarregar código de barras (SVG)</button>`
            : ""
        }
      </div>
    </div>
    ${
      p.tracks.length
        ? `<table class="tracks">
        <thead><tr><th>#</th><th>Faixa</th><th>Duração</th><th>ISRC</th></tr></thead>
        <tbody>${p.tracks
          .map(
            (t, i) => `<tr>
            <td class="n">${i + 1}</td>
            <td><span>${esc(t.title)}${t.feat ? ` <small>feat. ${esc(t.feat)}</small>` : ""}<button class="icon-btn" data-copy="${esc(t.title)}${t.feat ? ` feat. ${esc(t.feat)}` : ""}" title="Copiar">⧉</button></span></td>
            <td>${esc(t.duration || "—")}</td>
            <td>${t.isrc ? codeLine(t.isrc, fmtIsrc(t.isrc)) : "—"}</td>
          </tr>`,
          )
          .join("")}</tbody>
      </table>`
        : `<p class="hint">Sem faixas registadas.</p>`
    }
    <div class="dialog-actions">
      <button class="btn danger" data-action="delete-project" data-id="${p.id}">Eliminar</button>
      <span class="spacer"></span>
      <button class="btn ghost" data-close>Fechar</button>
      <button class="btn primary" data-action="edit-project" data-id="${p.id}">Editar</button>
    </div>`;
  const dlg = $("#viewDialog");
  if (!dlg.open) dlg.showModal();
}

async function deleteProject(id) {
  const p = state.projects.find((x) => x.id === id);
  if (!p || !confirm(`Eliminar o projeto "${p.title}"?`)) return;
  const { error } = await sb.from("projects").delete().eq("id", id);
  if (error) return toast(errMsg(error), "error");
  removeImages([p.coverPath]);
  state.projects = state.projects.filter((x) => x.id !== id);
  $("#viewDialog").close();
  render();
  toast("Projeto eliminado.");
}

async function downloadCover(p) {
  try {
    const res = await fetch(p.cover);
    if (!res.ok) throw new Error();
    download(`${p.title.replace(/[\\/:*?"<>|]/g, "")}.jpg`, await res.blob());
  } catch {
    toast("Não foi possível descarregar a capa.", "error");
  }
}

/* =========================================================
   Definições
   ========================================================= */
function openSettings() {
  const f = $("#settingsForm");
  for (const k of Object.keys(SETTINGS_FIELDS))
    f.elements[k].value = state.settings[k] ?? "";
  updateSettingsPreview();
  $("#settingsDialog").showModal();
}

function readSettingsForm() {
  const f = $("#settingsForm").elements;
  return {
    upcPrefix: f.upcPrefix.value.replace(/\D/g, ""),
    upcStart: Math.max(1, parseInt(f.upcStart.value, 10) || 1),
    isrcCountry: f.isrcCountry.value.toUpperCase().replace(/[^A-Z]/g, ""),
    isrcRegistrant: f.isrcRegistrant.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, ""),
    isrcStart: Math.min(
      99999,
      Math.max(1, parseInt(f.isrcStart.value, 10) || 1),
    ),
  };
}

function updateSettingsPreview() {
  const saved = state.settings;
  state.settings = readSettingsForm();
  const preview = (fn) => {
    try {
      return fn();
    } catch (err) {
      return err.message;
    }
  };
  $("#upcNextPreview").textContent = preview(() => nextUpc());
  $("#isrcNextPreview").textContent = preview(() => fmtIsrc(nextIsrc()));
  state.settings = saved;
}

async function saveSettings(e) {
  e.preventDefault();
  const s = readSettingsForm();
  if (s.upcPrefix && !/^\d{6,10}$/.test(s.upcPrefix))
    return toast("O prefixo GS1 deve ter entre 6 e 10 dígitos.", "error");
  if (s.isrcCountry && s.isrcCountry.length !== 2)
    return toast("O país ISRC tem 2 letras (ex.: PT).", "error");
  if (s.isrcRegistrant && s.isrcRegistrant.length !== 3)
    return toast("O código de registante tem 3 caracteres.", "error");
  await busy(e.target, async () => {
    const { error } = await sb.from("settings").upsert(settingsRow(s));
    if (error) return toast(errMsg(error), "error");
    state.settings = s;
    $("#settingsDialog").close();
    toast("Definições guardadas.", "ok");
  });
}

/* =========================================================
   Exportação / importação
   ========================================================= */
const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result);
    r.onerror = () => reject(r.error);
    r.readAsDataURL(blob);
  });

async function imageAsDataUrl(url) {
  if (!url) return null;
  try {
    const res = await fetch(url);
    return res.ok ? await blobToDataUrl(await res.blob()) : null;
  } catch {
    return null;
  }
}

function toggleMenu(open) {
  const btn = $("#dataMenu [data-action=toggle-menu]");
  const list = $("#dataMenu .menu-list");
  const show = open ?? list.hidden;
  list.hidden = !show;
  btn.setAttribute("aria-expanded", String(show));
}

// Backup autónomo: inclui as imagens embebidas para não depender do Storage
async function exportJson() {
  toast("A preparar o backup…");
  const pick = (obj, fields, skip) =>
    Object.fromEntries(
      Object.keys(fields)
        .filter((k) => k !== skip)
        .map((k) => [k, obj[k]]),
    );
  // Descarrega as imagens em lotes pequenos para não saturar a rede
  const mapLimit = async (list, fn, size = 5) => {
    const out = [];
    for (let i = 0; i < list.length; i += size)
      out.push(...(await Promise.all(list.slice(i, i + size).map(fn))));
    return out;
  };
  const artists = await mapLimit(state.artists, async (a) => ({
    id: a.id,
    ...pick(a, ARTIST_FIELDS, "photoPath"),
    photoData: await imageAsDataUrl(a.photo),
  }));
  const projects = await mapLimit(state.projects, async (p) => ({
    id: p.id,
    ...pick(p, PROJECT_FIELDS, "coverPath"),
    coverData: await imageAsDataUrl(p.cover),
  }));
  const data = {
    app: "catalogo-artistas",
    version: 2,
    exportedAt: new Date().toISOString(),
    settings: state.settings,
    artists,
    projects,
  };
  download(
    `catalogo-artistas-${new Date().toISOString().slice(0, 10)}.json`,
    JSON.stringify(data),
    "application/json",
  );
  toast("Backup exportado.", "ok");
}

// Converte a imagem do backup (v2: *Data; v1 local: photo/cover em data URL) num JPEG pronto a enviar
async function importedImage(data) {
  if (typeof data !== "string" || !data.startsWith("data:image/")) return null;
  try {
    return await readImage(await (await fetch(data)).blob(), 1000);
  } catch {
    return null;
  }
}

const str = (v) => (v == null ? "" : String(v).trim());

async function importJson(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    return toast("Ficheiro inválido.", "error");
  }
  if (
    data?.app !== "catalogo-artistas" ||
    !Array.isArray(data.artists) ||
    !Array.isArray(data.projects)
  ) {
    return toast("Este ficheiro não é um backup do catálogo.", "error");
  }
  const ok = confirm(
    `Importar ${data.artists.length} artistas e ${data.projects.length} projetos?\n` +
      "Os registos com o mesmo ID são atualizados; os restantes dados mantêm-se.\n" +
      "Fotos e capas já existentes não são substituídas.",
  );
  if (!ok) return;

  const menuBtn = $("#dataMenu [data-action=toggle-menu]");
  menuBtn.disabled = true;
  const idMap = new Map(); // IDs antigos (não-UUID) passam a UUID
  const mapId = (id) => {
    if (!idMap.has(id))
      idMap.set(id, UUID_RE.test(str(id)) ? str(id) : crypto.randomUUID());
    return idMap.get(id);
  };
  let done = 0;
  let failed = 0;
  const problems = []; // tudo o que foi descartado ou falhou, para mostrar no fim
  const knownArtists = new Set(state.artists.map((a) => a.id));
  const total = data.artists.length + data.projects.length;
  const progress = () => toast(`A importar… ${done + failed}/${total}`);

  try {
    // Definições: só substitui os campos que vêm preenchidos
    if (data.settings) {
      const s = { ...state.settings };
      for (const k of Object.keys(SETTINGS_FIELDS))
        if (data.settings[k] !== undefined && data.settings[k] !== "")
          s[k] = data.settings[k];
      const { error } = await sb.from("settings").upsert(settingsRow(s));
      if (!error) state.settings = s;
    }

    for (const src of data.artists) {
      let newPath = null;
      try {
        const a = { id: mapId(src.id) };
        for (const k of Object.keys(ARTIST_FIELDS)) a[k] = str(src[k]);
        if (!a.name) throw new Error("sem nome");
        const existing = artistById(a.id);
        a.photoPath = existing?.photoPath || "";
        // Só envia a imagem se o registo ainda não tem uma (evita duplicar ficheiros em cada importação)
        const blob = a.photoPath
          ? null
          : await importedImage(src.photoData || src.photo);
        if (blob) newPath = a.photoPath = await uploadImage(blob);
        const { error } = await sb
          .from("artists")
          .upsert({ id: a.id, ...toRow(a, ARTIST_FIELDS) });
        if (error) throw error;
        knownArtists.add(a.id);
        done++;
      } catch (err) {
        if (newPath) removeImages([newPath]);
        console.warn("Artista não importado:", src?.name, err);
        problems.push(
          `Artista "${str(src?.name) || "?"}" não importado: ${errMsg(err)}`,
        );
        failed++;
      }
      progress();
    }

    for (const src of data.projects) {
      let newPath = null;
      try {
        const p = {
          id: mapId(src.id),
          artistId: idMap.get(src.artistId) || str(src.artistId),
        };
        p.title = str(src.title);
        p.type = TYPES.includes(src.type) ? src.type : "Single";
        p.status = STATUSES.includes(src.status) ? src.status : "Rascunho";
        p.releaseDate = /^\d{4}-\d{2}-\d{2}$/.test(src.releaseDate)
          ? src.releaseDate
          : "";
        p.label = str(src.label);
        p.distributor = str(src.distributor);
        p.genre = str(src.genre);
        if (!knownArtists.has(p.artistId))
          throw new Error("o artista do projeto não existe");
        p.upc = isValidUpc(str(src.upc)) ? str(src.upc) : "";
        if (str(src.upc) && !p.upc)
          problems.push(
            `Projeto "${str(src.title)}": UPC inválido (${str(src.upc)}) foi ignorado.`,
          );
        p.tracks = (Array.isArray(src.tracks) ? src.tracks : []).map((t) => ({
          title: str(t.title),
          feat: str(t.feat),
          duration: str(t.duration),
          isrc: normIsrc(t.isrc),
        }));
        if (!p.title) throw new Error("sem título");
        const existing = state.projects.find((x) => x.id === p.id);
        p.coverPath = existing?.coverPath || "";
        const blob = p.coverPath
          ? null
          : await importedImage(src.coverData || src.cover);
        if (blob) newPath = p.coverPath = await uploadImage(blob);
        const { error } = await sb
          .from("projects")
          .upsert({ id: p.id, ...toRow(p, PROJECT_FIELDS) });
        if (error) throw error;
        done++;
      } catch (err) {
        if (newPath) removeImages([newPath]);
        console.warn("Projeto não importado:", src?.title, err);
        problems.push(
          `Projeto "${str(src?.title) || "?"}" não importado: ${errMsg(err)}`,
        );
        failed++;
      }
      progress();
    }

    await loadAll();
    render();
    toast(
      failed
        ? `Importados ${done}; ${failed} com erro.`
        : `Importação concluída: ${done} registos.`,
      failed ? "error" : "ok",
    );
    if (problems.length) {
      const shown = problems.slice(0, 10).join("\n");
      alert(
        `Importação com avisos (${problems.length}):\n\n${shown}${problems.length > 10 ? `\n… e mais ${problems.length - 10} (ver consola)` : ""}`,
      );
      console.warn("Avisos da importação:", problems);
    }
  } catch (err) {
    toast(errMsg(err), "error");
  } finally {
    menuBtn.disabled = false;
  }
}

function exportCsv() {
  // Prefixa com ' as células de texto que o Excel interpretaria como fórmula
  const cell = (v) => {
    let s = String(v ?? "");
    if (typeof v === "string" && /^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };
  const rows = [
    [
      "Artista",
      "Projeto",
      "Tipo",
      "Estado",
      "Data",
      "Editora",
      "Género",
      "Distribuidora",
      "UPC",
      "Nº",
      "Faixa",
      "Participações",
      "Duração",
      "ISRC",
    ],
  ];
  for (const p of sortProjects(state.projects)) {
    const artist = artistById(p.artistId)?.name || "";
    const base = [
      artist,
      p.title,
      p.type,
      statusOf(p),
      p.releaseDate,
      p.distributor,
      p.label,
      p.genre,
      p.upc,
    ];
    if (!p.tracks.length) rows.push([...base, "", "", "", "", ""]);
    p.tracks.forEach((t, i) =>
      rows.push([...base, i + 1, t.title, t.feat, t.duration, fmtIsrc(t.isrc)]),
    );
  }
  // ";" + BOM para abrir corretamente no Excel em português
  download(
    `catalogo-${new Date().toISOString().slice(0, 10)}.csv`,
    "﻿" + rows.map((r) => r.map(cell).join(";")).join("\r\n"),
    "text/csv;charset=utf-8",
  );
}

/* =========================================================
   Autenticação
   ========================================================= */
async function handleAuth(e) {
  e.preventDefault();
  const form = e.target;
  const email = form.elements.email.value.trim();
  const password = form.elements.password.value;
  const msg = $("#authMsg");
  msg.className = "hint";
  msg.textContent = "";

  await busy(form, async () => {
    // Registos novos estão desativados no Supabase; as contas são criadas no painel
    try {
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      msg.className = "hint bad";
      msg.textContent = errMsg(err);
    }
  });
}

function showApp(loggedIn) {
  $("#authScreen").hidden = loggedIn;
  $("#appShell").hidden = !loggedIn;
  document
    .querySelectorAll(".app-only")
    .forEach((el) => (el.hidden = !loggedIn));
  $("#userInfo").textContent = loggedIn ? `Sessão: ${session.user.email}` : "";
}

async function loadAll() {
  const [artists, projects, settings] = await Promise.all([
    fetchAll("artists"),
    fetchAll("projects"),
    sb.from("settings").select("*").maybeSingle(),
  ]);
  if (settings.error) throw settings.error;
  state.artists = artists.map(artistFromRow);
  state.projects = projects.map(projectFromRow);
  state.settings = settings.data
    ? fromRow(settings.data, SETTINGS_FIELDS)
    : { ...DEFAULT_SETTINGS };
}

async function onSessionChange() {
  showApp(!!session);
  document.querySelectorAll("dialog[open]").forEach((d) => d.close());
  Object.assign(state, {
    artists: [],
    projects: [],
    settings: { ...DEFAULT_SETTINGS },
    selected: "all",
    query: "",
    typeFilter: "",
  });
  $("#search").value = "";
  if (!session) return;
  $("#artistList").innerHTML = "";
  $("#main").innerHTML =
    `<div class="empty"><p>A carregar o catálogo…</p></div>`;
  try {
    await loadAll();
    render();
  } catch (err) {
    $("#main").innerHTML =
      `<div class="empty"><p>Não foi possível carregar os dados.<br>${esc(errMsg(err))}</p></div>`;
  }
}

/* =========================================================
   Eventos
   ========================================================= */
function bindImageInput(label, max, onImage) {
  const input = label.querySelector("input[type=file]");
  const handle = async (file) => {
    try {
      onImage(await readImage(file, max));
    } catch (err) {
      toast(err.message, "error");
    }
  };
  input.addEventListener("change", () => {
    if (input.files[0]) handle(input.files[0]);
    input.value = "";
  });
  label.addEventListener("dragover", (e) => {
    e.preventDefault();
    label.classList.add("drag");
  });
  label.addEventListener("dragleave", () => label.classList.remove("drag"));
  label.addEventListener("drop", (e) => {
    e.preventDefault();
    label.classList.remove("drag");
    if (e.dataTransfer.files[0]) handle(e.dataTransfer.files[0]);
  });
}

function bindEvents() {
  $("#authForm").addEventListener("submit", handleAuth);
  $("#btnLogout").addEventListener("click", () => sb.auth.signOut());
  $("#btnNewArtist").addEventListener("click", () => openArtistForm(null));
  $("#btnSettings").addEventListener("click", openSettings);

  let searchTimer;
  $("#search").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.query = e.target.value;
      render();
    }, 150);
  });

  $("#artistForm").addEventListener("submit", saveArtist);
  $("#projectForm").addEventListener("submit", saveProject);
  $("#settingsForm").addEventListener("submit", saveSettings);
  $("#settingsForm").addEventListener("input", updateSettingsPreview);
  $("#projectForm").elements.upc.addEventListener("input", updateUpcStatus);
  $("#importFile").addEventListener("change", (e) => {
    toggleMenu(false);
    if (e.target.files[0]) importJson(e.target.files[0]);
    e.target.value = "";
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") toggleMenu(false);
  });

  bindImageInput($("#artistDialog .photo-drop"), 500, (blob) => {
    artistDraft.photoBlob = blob;
    artistDraft.removePhoto = false;
    artistDraft.photo = URL.createObjectURL(blob);
    setPreview($("#artistPhotoPreview"), artistDraft.photo, "Foto");
    $("#btnRemovePhoto").hidden = false;
    $("#artistDialog").dataset.dirty = "1";
  });
  bindImageInput($("#projectDialog .photo-drop"), 1000, (blob) => {
    draft.coverBlob = blob;
    draft.removeCover = false;
    draft.cover = URL.createObjectURL(blob);
    setPreview($("#coverPreview"), draft.cover, "");
    $("#btnRemoveCover").hidden = false;
    $("#projectDialog").dataset.dirty = "1";
  });

  // Marca os formulários como alterados e protege o fecho acidental
  for (const id of ["artistDialog", "projectDialog"]) {
    const dlg = $(`#${id}`);
    dlg.addEventListener("input", () => (dlg.dataset.dirty = "1"));
    dlg.addEventListener("click", (e) => {
      if (e.target.closest("[data-action]")) dlg.dataset.dirty = "1";
    });
    dlg.addEventListener("cancel", (e) => {
      if (!dlg.dataset.dirty) return;
      e.preventDefault();
      closeDialog(dlg);
    });
  }

  // Abrir cartões com o teclado
  document.addEventListener("keydown", (e) => {
    const card = e.target.closest?.("[data-open]");
    if (card && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      openProjectView(card.dataset.open);
    }
  });

  document.addEventListener("click", (e) => {
    const t = e.target;

    // Fecha o menu de dados ao clicar fora dele ou numa das opções
    if (
      !t.closest("[data-action=toggle-menu]") &&
      !t.closest("#dataMenu label")
    )
      toggleMenu(false);

    if (t.closest("[data-close]")) return closeDialog(t.closest("dialog"));

    const sel = t.closest("[data-select]");
    if (sel) {
      state.selected = sel.dataset.select;
      state.typeFilter = "";
      if (state.query) {
        state.query = "";
        $("#search").value = "";
      }
      render();
      $("#main").scrollIntoView({ block: "start", behavior: "smooth" });
      return;
    }

    const chip = t.closest("[data-type]");
    if (chip) {
      state.typeFilter = chip.dataset.type;
      return renderMain();
    }

    const card = t.closest("[data-open]");
    if (card) return openProjectView(card.dataset.open);

    const copyBtn = t.closest("[data-copy]");
    if (copyBtn) return copyText(copyBtn.dataset.copy);

    const btn = t.closest("[data-action]");
    if (!btn) return;
    const i = Number(btn.dataset.i);
    const p = state.projects.find((x) => x.id === btn.dataset.id);

    switch (btn.dataset.action) {
      case "new-artist":
        return openArtistForm(null);
      case "edit-artist":
        return openArtistForm(artistById(state.selected));
      case "delete-artist":
        return deleteArtist();
      case "new-project":
        return openProjectForm(null, state.selected);
      case "edit-project":
        $("#viewDialog").close();
        return openProjectForm(p);
      case "delete-project":
        return deleteProject(btn.dataset.id);
      case "gen-upc":
        return refreshProjects().then(() => {
          try {
            const code = nextUpc();
            $("#projectForm").elements.upc.value = code;
            updateUpcStatus();
            toast(`UPC gerado: ${code}`, "ok");
          } catch (err) {
            toast(err.message, "error");
          }
        });
      case "remove-photo":
        artistDraft.photoBlob = null;
        artistDraft.photo = "";
        artistDraft.removePhoto = true;
        $("#btnRemovePhoto").hidden = true;
        return setPreview($("#artistPhotoPreview"), "", "Foto");
      case "remove-cover":
        draft.coverBlob = null;
        draft.cover = "";
        draft.removeCover = true;
        $("#btnRemoveCover").hidden = true;
        return setPreview(
          $("#coverPreview"),
          "",
          "Capa<br><small>clicar ou arrastar</small>",
        );
      case "gen-isrc":
        return genIsrcFor([i]);
      case "gen-isrc-all":
        syncTracks();
        return genIsrcFor(
          draft.tracks
            .map((tr, j) => (tr.title && !tr.isrc ? j : -1))
            .filter((j) => j >= 0),
        );
      case "add-track":
        syncTracks();
        draft.tracks.push(emptyTrack());
        renderTracks();
        return $(`#trackList .track-row:last-child input`).focus();
      case "track-del":
        syncTracks();
        draft.tracks.splice(i, 1);
        if (!draft.tracks.length) draft.tracks.push(emptyTrack());
        return renderTracks();
      case "track-up":
      case "track-down": {
        syncTracks();
        const j = btn.dataset.action === "track-up" ? i - 1 : i + 1;
        [draft.tracks[i], draft.tracks[j]] = [draft.tracks[j], draft.tracks[i]];
        return renderTracks();
      }
      case "download-barcode":
        return download(
          `UPC-${p.upc}.svg`,
          upcBarcodeSvg(p.upc),
          "image/svg+xml",
        );
      case "download-cover":
        return downloadCover(p);
      case "toggle-menu":
        return toggleMenu();
      case "export-csv":
        return exportCsv();
      case "export-json":
        return exportJson();
    }
  });

  // Fechar diálogos ao clicar fora
  document.querySelectorAll("dialog").forEach((dlg) =>
    dlg.addEventListener("mousedown", (e) => {
      if (e.target !== dlg) return;
      const r = dlg.getBoundingClientRect();
      const outside =
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom;
      if (outside) closeDialog(dlg);
    }),
  );
}

/* =========================================================
   Arranque
   ========================================================= */
bindEvents();

let authReady = false;
sb.auth.onAuthStateChange((_event, s) => {
  const userChanged = s?.user?.id !== session?.user?.id;
  session = s;
  if (authReady && !userChanged) return; // ex.: renovação do token
  authReady = true;
  // Fora do callback: chamadas ao Supabase dentro dele podem bloquear
  setTimeout(onSessionChange, 0);
});
