// クロッキー、スタイル・ライブラリを使う
// @need lib/croqujs lib/style
// パス、定規ライブラリを使う
// @need lib/path lib/ruler
// ウィジェット・ライブラリを使う
// @need lib/widget
// カラー、視覚ライブラリを使う
// @need lib/color lib/vision
// センサー・ライブラリを使う
// @need lib/sensor

const colors = {
	red: COLOR.convert([255, 0, 0], "rgb", "lab"),
	blue: COLOR.convert([0, 0, 255], "rgb", "lab"),
	green: COLOR.convert([0, 128, 0], "rgb", "lab"),
	yellow: COLOR.convert([255, 255, 0], "rgb", "lab"),
	brown: COLOR.convert([127, 63, 0], "rgb", "lab"),
	purple: COLOR.convert([255, 0, 255], "rgb", "lab"),
	orange: COLOR.convert([255, 127, 0], "rgb", "lab"),
	pink: COLOR.convert([255, 127, 255], "rgb", "lab"),
	white: COLOR.convert([255, 255, 255], "rgb", "lab"),
	gray: COLOR.convert([127, 127, 127], "rgb", "lab"),
	black: COLOR.convert([0, 255, 0], "rgb", "lab"),
};

// 準備する
const setup = function () {
	// 紙を作って名前を「p」に
	const p = new CROQUJS.Paper(320, 320);
	// カメラを作って名前を「cam」に
	const cam = new SENSOR.Camera(320, 240);
	cam.start();
	const ps = { cam, pause: false };  // 部品をまとめる

	const btn = new WIDGET.Toggle("S");
	btn.onClick((state) => {
		ps.pause = state;
	});
	p.onMouseClick((x, y) => { mouseClicked(p, x, y); });  // マウスがクリックされたとき
	p.animate(draw, [p, ps]);  // アニメーションする
};

// 絵を描く（紙、部品）
const draw = function (p, ps) {
	if (ps.pause === true) {
		return;
	}
	p.styleClear().color("White").draw();  // 消す
	p.drawImage(ps.cam.getImage(), 0, 0);  // カメラ画像を描く
};

// マウスがクリックされた（紙、x座標、y座標）
const mouseClicked = function (p, x, y) {
	const ruler = p.getRuler();  // 定規をもらう
	const rgb = getAverageColor(p, x, y);
	ruler.fill().rgb(...rgb);
	ruler.rect(0, 280, 40, 40).draw("fill");
	const labSample = checkColor(rgb);

	const rgbSample = COLOR.convert(labSample, "lab", "rgb");
	ruler.fill().rgb(...rgbSample);
	ruler.rect(80, 280, 40, 40).draw("fill");
};

// 色を調べる（RGB）
const checkColor = function (rgb) {
	console.log("RGB", rgb);
	const lab = COLOR.convert(rgb, "rgb", "lab");
	console.log("Lab", lab);

	let dist = 10000;
	let name = "none";
	for (const [n, c] of Object.entries(colors)) {
		const d = VISION.distance(lab, c);
		console.log(n, d);
		if (d < dist) {
			dist = d;
			name = n;
		}
	}
	console.log(name);
	return colors[name];
};

// 平均色を計算する（紙、x座標、y座標）
const getAverageColor = function (p, x, y) {
	let r = 0;
	let g = 0;
	let b = 0;
	for (let t = -2; t < 3; t += 1) {
		for (let s = -2; s < 3; s += 1) {
			const rgb = p.getPixel(x + s, y + t);
			r = r + rgb[0];
			g = g + rgb[1];
			b = b + rgb[2];
		}
	}
	return [r / 25, g / 25, b / 25];
};
