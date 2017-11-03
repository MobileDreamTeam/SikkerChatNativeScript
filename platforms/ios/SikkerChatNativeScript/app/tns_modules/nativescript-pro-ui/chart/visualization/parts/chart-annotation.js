Object.defineProperty(exports, "__esModule", { value: true });
var annotationModule = require("./chart-annotation-common");
// NOTE: This is a dummy file used to fix Typescript errors while developing.
// The NativeScript build overwrites it with one of the corresponding .ios.ts or .android.ts
// files from the same folder.
var ChartGridLineAnnotation = (function (_super) {
    __extends(ChartGridLineAnnotation, _super);
    function ChartGridLineAnnotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChartGridLineAnnotation;
}(annotationModule.ChartGridLineAnnotation));
exports.ChartGridLineAnnotation = ChartGridLineAnnotation;
var ChartPlotBandAnnotation = (function (_super) {
    __extends(ChartPlotBandAnnotation, _super);
    function ChartPlotBandAnnotation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ChartPlotBandAnnotation;
}(annotationModule.ChartPlotBandAnnotation));
exports.ChartPlotBandAnnotation = ChartPlotBandAnnotation;
