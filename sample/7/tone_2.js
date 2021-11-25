// クロッキー、スタイル・ライブラリを使う
// @need lib/croqujs lib/style
// 計算ライブラリを使う
// @need lib/calc
// ウィジェット・ライブラリを使う
// @need lib/widget
// シンセ、パッチ、アナライザー・ライブラリを使う
// @need lib/synth lib/patch lib/analyzer

// 準備する
const setup = function () {
	// シンセを作って名前を「s」に
	const s = new SYNTH.Synth();
	// 波形スコープを作って名前を「ws」に
	const ws = new ANALYZER.WaveformScope(500, 100);
	// スペクトル・スコープを作って名前を「ss」に
	const ss = new ANALYZER.SpectrumScope(500, 100);
	// スライダーを作って名前を「sl0～sl1」に
	const sl0 = new WIDGET.Slider(0, 100);
	const sl1 = new WIDGET.Slider(0, 1000);
	// 楽器を作る
	const inst = make(s, ws, ss);

	// 紙を作って名前を「p」に
	const p = new CROQUJS.Paper(200, 200);
	p.styleClear().color("White").draw();  // 消す
	p.onMouseDown(function (x, y) {  // ボタンが押されたとき
		play(inst, s.time());
	});
	p.onMouseMove(function (x, y) {  // マウスが動いたとき
		tune(inst, s.time(), 0.5, 440);
	});
	p.onMouseUp(function () {  // ボタンが離されたとき
		stop(inst, s.time());
	});
};

// 楽器を作る（シンセ、波形スコープ、スペクトル・スコープ）
const make = function (s, ws, ss) {
	// オシレーター・パッチを作る
	const osc = s.makeOsc({ type: "sine" });

	// スコープ・パッチを波形用、スペクトル用それぞれ作る
	const wave = s.makeScope({ widget: ws });
	const spec = s.makeScope({ widget: ss });

	// パッチをつなげる
	s.connect(osc, wave, spec, s.speaker());
	// まとめて返す
	return { osc };
};

// 楽器を鳴らす（楽器、時刻）
const play = function (inst, t) {
	inst.osc.play(t);  // 時刻tに再生する
};

// 楽器を設定する（楽器、時刻、ゲイン、周波数）
const tune = function (inst, t, g, f) {
	inst.osc.gain(g, t);  // 時刻tにゲインをgにする
	inst.osc.freq(f, t);  // 時刻tに周波数をfにする
};

// 楽器を止める（楽器、時刻）
const stop = function (inst, t) {
	inst.osc.stop(t);  // 時刻tに停止する
};
