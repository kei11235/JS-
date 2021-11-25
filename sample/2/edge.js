// クロッキー、スタイル・ライブラリを使う
// @need lib/croqujs lib/style
// パス、カメ・ライブラリを使う
// @need lib/path lib/turtle
// 定規ライブラリを使う
// @need lib/ruler
// 計算ライブラリを使う
// @need lib/calc

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
	const r = p.getRuler();
	r.stroke().color("YellowGreen").width(0.5);
	t.home();  // ホームに帰る
	t.stroke();  // 線スタイル
	t.tr(90);

	t.moveTo(10, 20);
	t.edge(PATH.normalEdge());  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 60);
	t.edge(PATH.triangleEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 100);
	t.edge(PATH.sineEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 140);
	t.edge(PATH.absSineEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 180);
	t.edge(PATH.squareEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 220);
	t.edge(PATH.sawtoothEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	t.moveTo(10, 260);
	t.edge(PATH.noiseEdge(30, 10));  // エッジを設定
	t.pd().go(100).pu();

	for (let i = 0; i < 7; i += 1) {
		r.rect(8, i * 40, 104, 40).draw("stroke");
	}
	t.stepNext(1);  // カメのアニメを進める
};
