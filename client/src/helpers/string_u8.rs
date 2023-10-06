use std::fs;

pub fn string_u8(path: &str) -> Vec<u8> {
    let file = fs::read_to_string(path).expect("Should have been able to read the file");

    let trim = file
        .replace("[", "")
        .replace("]", "")
        .replace(" ", "")
        .replace("\n", "");

    let split: Vec<&str> = trim.split(",").collect();

    let mut result: Vec<u8> = Vec::new();

    for x in split {
        if x.len() > 0 {
            result.push(x.to_owned().parse::<u8>().unwrap())
        }
    }

    // println!("result : {:#?}", result);

    result
}
