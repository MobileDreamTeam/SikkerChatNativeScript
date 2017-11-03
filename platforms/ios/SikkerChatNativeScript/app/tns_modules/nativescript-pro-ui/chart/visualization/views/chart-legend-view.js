Object.defineProperty(exports, "__esModule", { value: true });
var legendViewCommonModule = require("./chart-legend-view-common");
// NOTE: This is a dummy file used to fix Typescript errors while developing.
// The NativeScript build overwrites it with one of the corresponding .ios.ts or .android.ts
// files from the same folder.
var RadLegendView = (function (_super) {
    __extends(RadLegendView, _super);
    function RadLegendView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RadLegendView.prototype.onPositionChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onVerticalOffsetChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onHorizontalOffsetChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onOffsetOriginChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.onTitleChanged = function (oldValue, newValue) {
    };
    RadLegendView.prototype.updateLegendPosition = function (chartView) {
    };
    RadLegendView.prototype.updateLegendView = function (chartView) {
    };
    return RadLegendView;
}(legendViewCommonModule.RadLegendView));
exports.RadLegendView = RadLegendView;
