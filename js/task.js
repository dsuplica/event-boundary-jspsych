//GLOBAL VARIABLES//
// var this_id;
var jsPsych = initJsPsych()
// {
//     on_finish: function() {
//         jsPsych.data.get().localSave('csv', this_id.concat('smallchange.csv'));
//     }
// });

// capture info from Prolific
// var subject_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
// var study_id = jsPsych.data.getURLVariable('STUDY_ID');
// var session_id = jsPsych.data.getURLVariable('SESSION_ID');

// jsPsych.data.addProperties({
//     subject_id: subject_id,
//     study_id: study_id,
//     session_id: session_id
// });

var timeline = [];

// SAVE INFO INTO PAVLOVIA//
var pavloviaInfo;	
/* init connection with pavlovia.org */
var pavlovia_init = {
    type: jsPsychPavlovia,
    command: "init",
// Store info received by Pavlovia init into the global variable `pavloviaInfo`
setPavloviaInfo: function (info) {
    console.log(info);
    pavloviaInfo = info;
    }
};


var color_array = ["#af0000","#ffff00","#0000ff","#6b460d","#008c00","#ff00ff"];

var orientation_array = ["0.png","45.png","90.png","135.png","180.png","225.png","270.png","315.png"];


function shuffleArray(array) { // shuffle array, NOT IN PLACE
    var new_array = [].concat(array);
    for (var i = new_array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = new_array[i];
        new_array[i] = new_array[j];
        new_array[j] = temp;
    }
    return new_array;
};

function getRandomInt(max) { // random int from 0 (inclusive) to max (exclusive)
    return Math.floor(Math.random() * max);
}

// DEFINE TRIALS//
var pavloviaInfo;	
/* init connection with pavlovia.org */
var pavlovia_init = {
    type: jsPsychPavlovia,
    command: "init",
    // Store info received by Pavlovia init into the global variable `pavloviaInfo`
    setPavloviaInfo: function (info) {
        console.log(info);
        pavloviaInfo = info;
    }
};

var preload = {
    type: jsPsychPreload,
    images: shape_array,
};

var welcome = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Welcome to the experiment. Press any key to continue."
};

var form_trial = {
    type: jsPsychSurveyText,
    questions: [
        {prompt: "What is your <b>unique Prolific ID</b>?:", required: true}
        ],
};

var age_trial = {
    type: jsPsychSurveyText,
    questions: [
        {prompt: "Please provide the following demographic information"+
        " for reporting purposes: Your Age:", required: true}
    ],
};

var gender_options = ["Male", "Female", "Other", "Choose not to respond"];
var ethnicity_options = ["Yes, Hispanic or Latino", "No, not Hispanic or Latino","Choose not to respond"];
var race_options = ["American Indian or Alaskan Native","Asian","Pacific Islander","Black or African American", "White/Caucasian","More than one race/ethnicity","Choose not to respond"];

var multi_choice_block = {
    type: jsPsychSurveyMultiSelect,
    questions: [
        {prompt: "Gender:", name: 'Gender', options: gender_options, required: true},
        {prompt: "Are you of Hispanic or Latino regions of descent?",
        name: 'Ethnicity', options: ethnicity_options, required: true}, 
        {prompt: "Which race/ehtnicity best describes you?", name: 'Race', 
        options: race_options, required: true}
    ],
};

var instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p> This experiment contains 2 blocks, with each block containing 280 trials (500 trials total).</p><p>
    In this part of the experiment, a central fixation "+" will appear onto the screen for 500 milliseconds (0.5 second), followed by an array of either 
    <strong>FOUR colored squares</strong> or <strong>FOUR black shapes</strong> simultaneously appearing for 250 milliseconds (0.25 second).</p><p>
    Then, depending on what was previously displayed, the same array of <strong>FOUR</strong> objects with numbers (1,2,3,4) above them will appear 
    after a 1000 millisecond blank screen.</p><p> One object from the previous display would have changed.</p><p>Press the corresponding button on your 
    <strong>KEYBOARD</strong> to indicate which changed. Colored squares will only change in color, and black shapes will only change in shape.</p><p>
    This block contains 280 trials.</p><p> Press any key to begin. </p>
    `
};

var end_block_one = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p> This is the end of the first block.</p></p> Press any key to continue to the next block. </p>
    `
};

var instructions_two = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <p> In this part of the experiment, a central fixation "+" will appear onto the screen for 500 milliseconds (0.5 second), followed by an array of either 
    <strong>TWO colored squares</strong> and <strong>TWO black shapes</strong> simultaneously appearing for 250 milliseconds (0.25 second).</p><p>
    Then, the same array of objects with numbers (1,2,3,4) above them will appear after a 1000 millisecond blank screen.</p><p> 
    One object from the previous display would have changed.</p><p>Press the corresponding button on your <strong>KEYBOARD</strong> to indicate which changed. 
    Colored squares will only change in color, and black shapes will only change in shape.</p><p>This block contains 280 trials.</p><p> Press any key to begin. </p>
    `
};

var trial = {
    type: jsPsychchangelocorientation,
    n_colors: jsPsych.timelineVariable("n_colors"),
    n_orientations: jsPsych.timelineVariable("n_orientations"),
    colors: jsPsych.timelineVariable("colors"),
    orientations: jsPsych.timelineVariable("orientations"),
    test_index: jsPsych.timelineVariable("test_index"),
    test_item: jsPsych.timelineVariable("test_item"),
};

// DEFINE TIMELINE VARIABLES
// uniform
var uniform_timeline_vars = [];
// OG SHAPES
for (var i = 0; i < 8; i++) { // for each og shape
    // small change
    var small_trial = {
        n_colors: 0,
        n_shapes: 4,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: alt_shape_array[i],
    };
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i + 7,1); // remember: toSpliced changes the indices one at a time, so be careful when indexing multiple cuts!
    var other_shapes_copy = Array.from(other_shapes);
    small_trial.shapes.push(og_shape_array[i]);
    // var shuffled_shapes = shuffleArray(other_shapes); // shuffle together all other shapes
    for (var j = 0; j < 3; j++) { // pick 3 randomly w/o replacement
        var other_rand_index = getRandomInt(other_shapes_copy.length)
        small_trial.shapes.push(other_shapes_copy[other_rand_index]);
        if (other_rand_index < other_shapes_copy.length/2){
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index,1);
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index + (other_shapes_copy.length - 1)/2,1)
        } else{
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index,1);
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index - (other_shapes_copy.length + 1)/2,1)
        }
    };
    uniform_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 0,
        n_shapes: 4,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    var rand_index = getRandomInt(14);
    big_trial.test_item = other_shapes[rand_index]; // randomly choose other shape to be big change
    var other_shapes_copy_big = Array.from(other_shapes);
    other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index,1);
    if (rand_index > 6) {
        other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index - 7,1)
    } else {
        other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index + 6,1)
    }
    big_trial.shapes = [og_shape_array[i]]; 

    // var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([alt_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    
    for (var j = 0; j < 3; j++) {
        var other_rand_index = getRandomInt(other_shapes_copy_big.length)
        big_trial.shapes.push(other_shapes_copy_big[other_rand_index]);
        if (other_rand_index < other_shapes_copy_big.length/2){
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index,1);
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index + (other_shapes_copy_big.length - 1)/2,1);
        } else {
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index,1);
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index - (other_shapes_copy_big.length + 1)/2,1);
        }
    };
    uniform_timeline_vars.push(big_trial);
};
// ALT SHAPES
for (var i = 0; i < 8; i++) { // for each shape
    // small change
    var small_trial = {
        n_colors: 0,
        n_shapes: 4,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: og_shape_array[i],
    };
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i + 7,1);
    var other_shapes_copy = Array.from(other_shapes);
    small_trial.shapes.push(alt_shape_array[i]);
    // var shuffled_shapes = shuffleArray(other_shapes); // shuffle together all other shapes
    for (var j = 0; j < 3; j++) { // pick 3 randomly w/o replacement
        var other_rand_index = getRandomInt(other_shapes_copy.length)
        small_trial.shapes.push(other_shapes_copy[other_rand_index]);
        if (other_rand_index < other_shapes_copy.length/2){
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index,1);
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index + (other_shapes_copy.length - 1)/2,1);
        } else{
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index,1);
            other_shapes_copy = other_shapes_copy.toSpliced(other_rand_index - (other_shapes_copy.length + 1)/2,1)
        }
    };
    uniform_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 0,
        n_shapes: 4,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    var rand_index = getRandomInt(14);
    big_trial.test_item = other_shapes[rand_index]; // randomly choose other shape to be big change
    var other_shapes_copy_big = Array.from(other_shapes);
    other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index,1);
    if (rand_index > 6){
        other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index - 7,1)
    } else{
        other_shapes_copy_big = other_shapes_copy_big.toSpliced(rand_index + 6,1)
    }
    big_trial.shapes = [alt_shape_array[i]]; 
    // var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([og_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    
    for (var j = 0; j < 3; j++) {
        var other_rand_index = getRandomInt(other_shapes_copy_big.length)
        big_trial.shapes.push(other_shapes_copy_big[other_rand_index]);
        if (other_rand_index < other_shapes_copy_big.length/2){
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index,1);
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index + (other_shapes_copy_big.length - 1)/2,1);
        } else{
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index,1);
            other_shapes_copy_big = other_shapes_copy_big.toSpliced(other_rand_index - (other_shapes_copy_big.length + 1)/2,1)
        }
    };
    uniform_timeline_vars.push(big_trial);
};
// OG COLORS
for (var i = 0; i < 6; i++) { // for each color
    // small change
    var small_trial = {
        n_colors: 4,
        n_shapes: 0,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: alt_color_array[i],
    };
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var other_colors_copy = Array.from(other_colors); // make a copy of other_colors in order to mess with the copy and not with other_colors
    small_trial.colors.push(og_color_array[i]);
    // var shuffled_colors = shuffleArray(other_colors); // shuffle together all other colors
    for (var j = 0; j < 3; j++) { // pick 3 randomly w/o replacement
        var other_rand_index = getRandomInt(other_colors_copy.length)
        small_trial.colors.push(other_colors_copy[other_rand_index]);
        if (other_rand_index < other_colors_copy.length/2){
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index,1);
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index + (other_colors_copy.length-1)/2,1);
        } else {
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index,1);
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index - (other_colors_copy.length+1)/2,1)
        }
    };
    uniform_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 4,
        n_shapes: 0,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    var rand_index = getRandomInt(10);
    big_trial.test_item = other_colors[rand_index]; // randomly choose index of other color to be big change
    var other_colors_copy_big = Array.from(other_colors); // make a copy of other_colors in order to mess with the copy and not with other_colors
    other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index,1); // choose big color change 
    if (rand_index > 4) { // decide what alt to omit depending on if the index is from the lower numbers (og array) or higher numbers (alt array)
        other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index - 5,1)
    } else {
        other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index + 4,1)
    }
    big_trial.colors = [og_color_array[i]]; 
    
    for (var j = 0; j < 3; j++) {
        var other_rand_index = getRandomInt(other_colors_copy_big.length)
        big_trial.colors.push(other_colors_copy_big[other_rand_index]);
        if (other_rand_index < other_colors_copy_big.length/2){
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index,1);
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index + (other_colors_copy_big.length-1)/2,1);
        } else {
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index,1);
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index - (other_colors_copy_big.length+1)/2,1)
        }
    };
    uniform_timeline_vars.push(big_trial);
};
// ALT COLORS
for (var i = 0; i < 6; i++) { // for each color
    // small change
    var small_trial = {
        n_colors: 4,
        n_shapes: 0,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: og_color_array[i],
    };
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var other_colors_copy = Array.from(other_colors); 
    small_trial.colors.push(alt_color_array[i]);
    //var shuffled_colors = shuffleArray(other_colors); // shuffle together all other colors
    for (var j = 0; j < 3; j++) { // pick 3 randomly w/o replacement
        var other_rand_index = getRandomInt(other_colors_copy.length)
        small_trial.colors.push(other_colors_copy[other_rand_index]);
        if (other_rand_index < other_colors_copy.length/2){
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index,1) // splice out the index chosen for each of the three other colors in the test array (this is for the index 0 to 4)
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index + (other_colors_copy.length-1)/2,1); // splice out the index's alternate as well for each of the three colors chosen for test array; add because the alternate is in later in the array; divide by two because after the first splice we have an odd number 
        } else {
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index,1); // splice out the index chosen for each of the three other colors in the test array (this is for the index 5 to 9)
            other_colors_copy = other_colors_copy.toSpliced(other_rand_index - (other_colors_copy.length+1)/2,1) // splice out the index's alternate as well for each of the three colors chosen for test array; subtract because the alternate is in earlier in the array; divide by two because after the first splice we have an odd number
        }
    };
    uniform_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 4,
        n_shapes: 0,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    var rand_index = getRandomInt(10);
    big_trial.test_item = other_colors[rand_index]; // randomly choose other color to be big change
    var other_colors_copy_big = Array.from(other_colors);
    other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index,1);
    if (rand_index > 4) {
        other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index - 5,1)
    } else {
        other_colors_copy_big = other_colors_copy_big.toSpliced(rand_index + 4,1)
    }
    big_trial.colors = [alt_color_array[i]]; 

    // var shuffled_colors = shuffleArray(other_colors.toSpliced(rand_index,1)); // shuffle together all other colors + add back in alt counterpart;; .concat([og_color_array[i]])
    for (var j = 0; j < 3; j++) {
        var other_rand_index = getRandomInt(other_colors_copy_big.length)
        big_trial.colors.push(other_colors_copy_big[other_rand_index]);
        if (other_rand_index < other_colors_copy_big.length/2){
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index,1);
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index + (other_colors_copy_big.length-1)/2,1);
        } else{
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index,1);
            other_colors_copy_big = other_colors_copy_big.toSpliced(other_rand_index - (other_colors_copy_big.length+1)/2,1);
        }
    };
    uniform_timeline_vars.push(big_trial);
};

// mixed
var mixed_timeline_vars = [];
// OG SHAPES
for (var i = 0; i < 8; i++) { // for each og shape
    // small change
    var small_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 2,
        test_item: alt_shape_array[i],
    };
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i + 7,1);
    var second_shape = other_shapes[getRandomInt(14)];
    small_trial.shapes.push(og_shape_array[i]);
    small_trial.shapes.push(second_shape);
    // var shuffled_shapes = shuffleArray(other_shapes); // shuffle together all other shapes
    // var second_shape = shuffled_shapes[0];
    // console.log(second_shape);
    // console.log(small_trial.shapes)

    // var shuffled_colors2 = shuffleArray(color_array); // shuffle all 16 colors before choosing the two colors in the mixed array
    
    var color_array_copy = Array.from(color_array);
    var rand_index = getRandomInt(color_array_copy.length);
    small_trial.colors.push(color_array_copy[rand_index]);
    color_array_copy = color_array_copy.toSpliced(rand_index,1);
    if (rand_index < color_array_copy.length/2){
        color_array_copy = color_array_copy.toSpliced(rand_index + (color_array_copy.length-1)/2,1)
    } else {
        color_array_copy = color_array_copy.toSpliced(rand_index - (color_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(color_array_copy.length);
    small_trial.colors.push(color_array_copy[rand_index]);

    mixed_timeline_vars.push(small_trial);


    // big change
    var big_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 2,
        test_item: '',
    };
    big_trial.shapes = [og_shape_array[i]]; 
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i + 7,1);
    var rand_index = getRandomInt(14)
    big_trial.test_item = other_shapes[rand_index]; // randomly choose other shape to be big change
    var other_shapes_copy = Array.from(other_shapes);
    other_shapes_copy = other_shapes_copy.toSpliced(rand_index,1);
    if (rand_index < other_shapes_copy.length/2){
        other_shapes_copy = other_shapes_copy.toSpliced(rand_index + (other_shapes_copy.length-1)/2,1)
    } else{
        other_shapes_copy = other_shapes_copy.toSpliced(rand_index - (other_shapes_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(other_shapes_copy.length);
    var second_shape = other_shapes_copy[rand_index];
    // var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([alt_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    big_trial.shapes.push(second_shape);

    // var shuffled_colors2 = shuffleArray(color_array); // shuffle all 16 colors before choosing the two colors in the mixed array
    var color_array_copy = Array.from(color_array);
    rand_index = getRandomInt(color_array_copy.length);
    big_trial.colors.push(color_array_copy[rand_index]);
    color_array_copy = color_array_copy.toSpliced(rand_index,1);
    if (rand_index < color_array_copy.length/2){
        color_array_copy = color_array_copy.toSpliced(rand_index + (color_array_copy.length-1)/2,1)
    } else {
        color_array_copy = color_array_copy.toSpliced(rand_index - (color_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(color_array_copy.length);
    big_trial.colors.push(color_array_copy[rand_index]);
    mixed_timeline_vars.push(big_trial);
};

// ALT SHAPES 
for (var i = 0; i < 8; i++) { // for each shape
    // small change
    var small_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 2,
        test_item: og_shape_array[i],
    };
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i + 7,1);
    var second_shape = other_shapes[getRandomInt(14)];
    small_trial.shapes.push(alt_shape_array[i]);
    //var shuffled_shapes = shuffleArray(other_shapes); // shuffle together all other shapes
    small_trial.shapes.push(second_shape);

    //var shuffled_colors2 = shuffleArray(color_array); // shuffle all 16 colors before choosing the two colors in the mixed array
    var color_array_copy = Array.from(color_array);
    rand_index = getRandomInt(color_array_copy.length);
    small_trial.colors.push(color_array_copy[rand_index]);
    color_array_copy = color_array_copy.toSpliced(rand_index,1);
    if (rand_index < color_array_copy.length/2){
        color_array_copy = color_array_copy.toSpliced(rand_index + (color_array_copy.length-1)/2,1)
    } else {
        color_array_copy = color_array_copy.toSpliced(rand_index - (color_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(color_array_copy.length);
    small_trial.colors.push(color_array_copy[rand_index]);

    mixed_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'shape',
        colors: [],
        shapes: [],
        test_index: 2,
        test_item: '',
    };
    big_trial.shapes = [alt_shape_array[i]]; 
    var other_shapes = shape_array.toSpliced(i,1).toSpliced(i+7,1);
    var rand_index = getRandomInt(14);
    big_trial.test_item = other_shapes[rand_index]; // randomly choose other shape to be big change
    var other_shapes_copy = Array.from(other_shapes);
    other_shapes_copy = other_shapes_copy.toSpliced(rand_index,1);
    if (rand_index < other_shapes_copy.length/2){
        other_shapes_copy = other_shapes_copy.toSpliced(rand_index + (other_shapes_copy.length-1)/2,1)
    } else{
        other_shapes_copy = other_shapes_copy.toSpliced(rand_index - (other_shapes_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(other_shapes_copy.length);
    var second_shape = other_shapes_copy[rand_index];
    //var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([og_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    big_trial.shapes.push(second_shape);
    
    //var shuffled_colors2 = shuffleArray(color_array); // shuffle all 16 colors before choosing the two colors in the mixed array
    var color_array_copy = Array.from(color_array);
    rand_index = getRandomInt(color_array_copy.length);
    big_trial.colors.push(color_array_copy[rand_index]);
    color_array_copy = color_array_copy.toSpliced(rand_index,1);
    if (rand_index < color_array_copy.length/2){
        color_array_copy = color_array_copy.toSpliced(rand_index + (color_array_copy.length-1)/2,1)
    } else {
        color_array_copy = color_array_copy.toSpliced(rand_index - (color_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(color_array_copy.length);
    big_trial.colors.push(color_array_copy[rand_index]);
    mixed_timeline_vars.push(big_trial);
};

// OG COLORS 
for (var i = 0; i < 6; i++) { // for each og color
    // small change
    var small_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: alt_color_array[i],
    };
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var second_color = other_colors[getRandomInt(10)];
    small_trial.colors.push(og_color_array[i]);
    small_trial.colors.push(second_color);

    // var shuffled_shapes2 = shuffleArray(shape_array); // shuffle all 16 shapes before choosing the two shapes in the mixed array
    var shape_array_copy = Array.from(shape_array);
    var rand_index = getRandomInt(shape_array_copy.length);
    small_trial.shapes.push(shape_array_copy[rand_index]);
    shape_array_copy = shape_array_copy.toSpliced(rand_index,1);
    if (rand_index < shape_array_copy.length/2){
        shape_array_copy = shape_array_copy.toSpliced(rand_index + (shape_array_copy.length-1)/2,1)
    } else {
        shape_array_copy = shape_array_copy.toSpliced(rand_index - (shape_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(shape_array_copy.length);
    small_trial.shapes.push(shape_array_copy[rand_index]);
    mixed_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    big_trial.colors = [og_color_array[i]]; 
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var rand_index = getRandomInt(10)
    big_trial.test_item = other_colors[rand_index]; // randomly choose other shape to be big change
    var other_colors_copy = Array.from(other_colors);
    other_colors_copy = other_colors_copy.toSpliced(rand_index,1);
    if (rand_index < other_colors_copy.length/2){
        other_colors_copy = other_colors_copy.toSpliced(rand_index + (other_colors_copy.length-1)/2,1)
    } else{
        other_colors_copy = other_colors_copy.toSpliced(rand_index - (other_colors_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(other_colors_copy.length);
    var second_color = other_colors_copy[rand_index];
    // var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([alt_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    big_trial.colors.push(second_color);

    // var shuffled_shapes2 = shuffleArray(shape_array); // shuffle all 16 shapes before choosing the two sbapes in the mixed array
    var shape_array_copy = Array.from(shape_array);
    rand_index = getRandomInt(shape_array_copy.length);
    big_trial.shapes.push(shape_array_copy[rand_index]);
    shape_array_copy = shape_array_copy.toSpliced(rand_index,1);
    if (rand_index < shape_array_copy.length/2){
        shape_array_copy = shape_array_copy.toSpliced(rand_index + (shape_array_copy.length-1)/2,1)
    } else {
        shape_array_copy = shape_array_copy.toSpliced(rand_index - (shape_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(shape_array_copy.length);
    big_trial.shapes.push(shape_array_copy[rand_index]);
    mixed_timeline_vars.push(big_trial);
};

// ALT COlORS
for (var i = 0; i < 6; i++) { // for each color
    // small change
    var small_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: og_color_array[i],
    };
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var second_color = other_colors[getRandomInt(10)];
    small_trial.colors.push(alt_color_array[i]);
    small_trial.colors.push(second_color);

    // var shuffled_shapes2 = shuffleArray(shape_array); // shuffle all 16 shapes before choosing the two colors in the mixed array
    
    var shape_array_copy = Array.from(shape_array);
    var rand_index = getRandomInt(shape_array_copy.length);
    small_trial.shapes.push(shape_array_copy[rand_index]);
    shape_array_copy = shape_array_copy.toSpliced(rand_index,1);
    if (rand_index < shape_array_copy.length/2){
        shape_array_copy = shape_array_copy.toSpliced(rand_index + (shape_array_copy.length-1)/2,1)
    } else {
        shape_array_copy = shape_array_copy.toSpliced(rand_index - (shape_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(shape_array_copy.length);
    small_trial.shapes.push(shape_array_copy[rand_index]);

    mixed_timeline_vars.push(small_trial);

    // big change
    var big_trial = {
        n_colors: 2,
        n_shapes: 2,
        shape_colorchange: 'color',
        colors: [],
        shapes: [],
        test_index: 0,
        test_item: '',
    };
    big_trial.colors = [alt_color_array[i]]; 
    var other_colors = color_array.toSpliced(i,1).toSpliced(i + 5,1);
    var rand_index = getRandomInt(10)
    big_trial.test_item = other_colors[rand_index]; // randomly choose other shape to be big change
    var other_colors_copy = Array.from(other_colors);
    other_colors_copy = other_colors_copy.toSpliced(rand_index,1);
    if (rand_index < other_colors_copy.length/2){
        other_colors_copy = other_colors_copy.toSpliced(rand_index + (other_colors_copy.length-1)/2,1)
    } else{
        other_colors_copy = other_colors_copy.toSpliced(rand_index - (other_colors_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(other_colors_copy.length);
    var second_color = other_colors_copy[rand_index];
    // var shuffled_shapes = shuffleArray(other_shapes.toSpliced(rand_index,1).concat([alt_shape_array[i]])); // shuffle together all other shapes + add back in alt counterpart
    big_trial.colors.push(second_color);

    // var shuffled_shapes2 = shuffleArray(shape_array); // shuffle all 16 shapes before choosing the two colors in the mixed array
    var shape_array_copy = Array.from(shape_array);
    rand_index = getRandomInt(shape_array_copy.length);
    big_trial.shapes.push(shape_array_copy[rand_index]);
    shape_array_copy = shape_array_copy.toSpliced(rand_index,1);
    if (rand_index < shape_array_copy.length/2){
        shape_array_copy = shape_array_copy.toSpliced(rand_index + (shape_array_copy.length-1)/2,1)
    } else {
        shape_array_copy = shape_array_copy.toSpliced(rand_index - (shape_array_copy.length+1)/2,1)
    }
    rand_index = getRandomInt(shape_array_copy.length);
    big_trial.shapes.push(shape_array_copy[rand_index]);

    mixed_timeline_vars.push(big_trial);
};
console.log(mixed_timeline_vars)

var test_procedure_uniform = {
    timeline: [trial],
    //THE VARIABLES DEFINED IN THE TRIAL (ABOVE) WILL REFER HERE FOR THEIR VALUES//
    timeline_variables: uniform_timeline_vars,
    randomize_order: true,
    repetitions: 5
};

var test_procedure_mixed = {
    timeline: [trial],
    //THE VARIABLES DEFINED IN THE TRIAL (ABOVE) WILL REFER HERE FOR THEIR VALUES//
    timeline_variables: mixed_timeline_vars,
    randomize_order: true,
    repetitions: 5
};

/* finish connection with pavlovia.org */
var pavlovia_finish = {
    type: jsPsychPavlovia,
    command: "finish",
    // Thomas Pronk; call this function when we're done with the experiment and data reception has been confirmed by Pavlovia
    completedCallback: function() {
        alert('data successfully submitted!');
    }
};

var end_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "This is the end of the experiment. Thank you for participating!" + 
    "You can come back to Prolific now by clicking the link below:</p>", 
    choices: ["<a href='https://app.prolific.com/submissions/complete?cc=C145S7Y9'>Press to finish</a>"]
};

//CREATE TIMELINE//

timeline.push(pavlovia_init);	
timeline.push(preload);
timeline.push(welcome);
timeline.push(form_trial);
timeline.push(age_trial);
timeline.push(multi_choice_block);
timeline.push(instructions);
timeline.push(test_procedure_uniform);
timeline.push(end_block_one);
timeline.push(instructions_two);
timeline.push(test_procedure_mixed);
timeline.push(pavlovia_finish);
timeline.push(end_trial);
jsPsych.run(timeline);