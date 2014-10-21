
declare module ds.symposium.common.models {
enum BrandColor {
  DsBlue = 0,
  TelsRed = 1,
  DssiOrange = 2
}
interface IBrandishness {
  brandColor: ds.symposium.common.models.BrandColor;
  name: string;
  brandishness: number;
}
}
