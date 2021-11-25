// クロッキー、スタイル・ライブラリを使う
// @need lib/croqujs lib/style
// パス、カメ・ライブラリを使う
// @need lib/path lib/turtle

// 準備する
const setup = function () {
	// 紙を作って名前を「p」に
	const p = new CROQUJS.Paper(600, 600);
	// カメを作って名前を「t」に
	const t = new TURTLE.Turtle(p);
// 	t.visible(true);  // カメが見えるか
	p.animate(draw, [p, t]);  // アニメーションする
};

// 絵を描く（紙、カメ）
const draw = function (p, t) {
	p.styleClear().color("White").draw();  // 消す
	t.home();  // ホームに帰る
	t.stroke();  // 線スタイル
	t.edge(PATH.normalEdge());  // エッジを設定

	t.moveTo(50, 120);
	drawShape(t, "vertical");

	t.moveTo(180, 120);
	drawShape(t, "horizontal");

	t.moveTo(310, 120);
	drawShape(t, "vector");

	t.moveTo(50, 250);
	drawShape(t, "inner");

	t.moveTo(180, 250);
	drawShape(t, "outer");

	t.moveTo(310, 250);
	drawShape(t, "diameter");

	t.moveTo(440, 250);
	drawShape(t, "radius");

	t.stepNext(1);  // カメのアニメを進める
};

// 図形を描く（カメ）
const drawShape = function (t, type) {
	t.save();
	t.mode("fillStroke");  // モードを設定
	t.fill().grad(type).addColor("black").addColor("White");  // ぬりスタイル
	t.pd();  // ペンを下ろす
	t.tl(40).go(50);
	t.tr(90).go(50);
	t.tr(90).go(20);
	t.tl(90).go(50);
	t.tr(90).go(10);
	t.tr(90).go(50);
	t.tl(90).go(20);
	t.tr(90).go(50);
	t.pu();  // ペンを上げる
	t.restore();

	t.save();
	t.mode("stroke");  // モードを設定
	t.stroke().color("yellowGreen").dash([4, 4]).width(4);
	if (type === "vertical" || type === "horizontal") {
		drawArea(t);
	}
	if (type === "vector") {
		drawVector(t);
	}
	if (type === "inner") {
		t.save();
		t.tr(90).go(15.5).tl(90).go(44);
		t.pd().circle([50, 44]).pu();
		t.restore();
		t.save();
		setAdditionalLineStroke(t);
		drawArea(t);
		t.restore();
	}
	if (type === "outer") {
		t.save();
		t.tr(90).go(15.5).tl(90).go(44);
		t.pd().circle([50 * 1.35, 44 * 1.35]).pu();
		t.restore();
		t.save();
		setAdditionalLineStroke(t);
		drawArea(t);
		t.restore();
	}
	if (type === "diameter") {
		t.save();
		t.tr(34).go(53);
		t.pd().circle(52).pu();
		t.restore();
		t.save();
		setAdditionalLineStroke(t);
		drawVector(t);
		t.restore();
	}
	if (type === "radius") {
		t.save();
		t.pd().circle(104, [-18, 90]).pu();
		t.restore();
		t.save();
		setAdditionalLineStroke(t);
		drawVector(t);
		t.restore();
	}
	t.restore();
};

// 領域を描く
const drawArea = function (t) {
	t.pd();
	t.tl(90).go(33);
	t.tr(90).go(88);
	t.tr(90).go(97);
	t.tr(90).go(88);
	t.tr(90).go(62);
	t.pu();
};

// ベクトルを描く
const drawVector = function (t) {
	t.pd();
	t.tr(34).go(106);
	t.pu();
};

// 補助線の線スタイルをセットする
const setAdditionalLineStroke = function (t) {
	t.stroke().color("orange").dash().width(2);
};
