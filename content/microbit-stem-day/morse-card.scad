// ─────────────────────────────────────────────────
// Morse Code Reference Card
// 26 letters · 6 columns · 5 rows
// ─────────────────────────────────────────────────

card_w       = 180;
card_h       = 220;
card_t       = 3.0;
corner_r     = 5;

cols         = 6;
rows         = 5;
margin_x     = 10;
margin_y     = 10;

cell_w = (card_w - 2*margin_x) / cols;  // ~26.7 mm
cell_h = (card_h - 2*margin_y) / rows;  // 40 mm

letter_size  = 9;
letter_raise = 1.2;
dot_r        = 1.8;
symbol_raise = 1.5;
dash_len     = 5.5;
dash_h       = 2.2;
symbol_slot  = 5.0;   // spacing between symbols

// 0 = dot, 1 = dash
morse = [
    [0,1],     [1,0,0,0], [1,0,1,0], [1,0,0],   [0],       [0,0,1,0],
    [1,1,0],   [0,0,0,0], [0,0],     [0,1,1,1], [1,0,1],   [0,1,0,0],
    [1,1],     [1,0],     [1,1,1],   [0,1,1,0], [1,1,0,1], [0,1,0],
    [0,0,0],   [1],       [0,0,1],   [0,0,0,1], [0,1,1],   [1,0,0,1],
    [1,0,1,1], [1,1,0,0]
];

letters = [
    "A","B","C","D","E","F",
    "G","H","I","J","K","L",
    "M","N","O","P","Q","R",
    "S","T","U","V","W","X",
    "Y","Z"
];

// ── Modules ───────────────────────────────────────

module base_plate() {
    linear_extrude(card_t)
        offset(r=corner_r)
            square([card_w - 2*corner_r, card_h - 2*corner_r]);
}

module place_dot(x, y) {
    translate([x, y, card_t])
        cylinder(r=dot_r, h=symbol_raise, $fn=24);
}

module place_dash(x, y) {
    translate([x, y, card_t])
        linear_extrude(symbol_raise)
            offset(r=0.8)
                square([dash_len - 1.6, dash_h - 1.6], center=true);
}

module place_morse(pattern, cx, cy) {
    n = len(pattern);
    for (i = [0:n-1]) {
        sx = cx + (i - (n-1)/2.0) * symbol_slot;
        if (pattern[i] == 0) place_dot(sx, cy);
        else place_dash(sx, cy);
    }
}

module place_letter(idx) {
    col = idx % cols;
    row = floor(idx / cols);

    cx       = margin_x + col * cell_w + cell_w / 2;
    cy_top   = card_h - margin_y - row * cell_h;
    letter_y = cy_top - cell_h * 0.38;
    morse_y  = cy_top - cell_h * 0.72;

    // Raised letter
    translate([cx, letter_y, card_t])
        linear_extrude(letter_raise)
            text(letters[idx], size=letter_size,
                 font="Liberation Sans:style=Bold",
                 halign="center", valign="center");

    // Raised morse symbols
    place_morse(morse[idx], cx, morse_y);
}

// ── Render ────────────────────────────────────────

union() {
    base_plate();
    for (i = [0:25]) place_letter(i);
}
