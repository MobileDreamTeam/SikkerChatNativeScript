Object.defineProperty(exports, "__esModule", { value: true });
var trackBallModule = require("./chart-track-ball-common");
// NOTE: This is a dummy file used to fix Typescript errors while developing.
// The NativeScript build overwrites it with one of the corresponding .ios.ts or .android.ts
// files from the same folder.
var Trackball = (function (_super) {
    __extends(Trackball, _super);
    function Trackball() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Trackball;
}(trackBallModule.Trackball));
exports.Trackball = Trackball;
