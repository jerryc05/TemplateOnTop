// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use chrono::Local;
use std::io::prelude::*;
use tauri::api::path::desktop_dir;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let mut path = desktop_dir().unwrap().into_os_string();
    path.push("/template-helper.log");

    let dt = Local::now();
    let timestamp = dt.format("%+").to_string();
    println!("{} {}", timestamp, path.to_str().unwrap());

    let mut file = std::fs::OpenOptions::new()
        .create(true)
        .append(true)
        .open(&path)
        .unwrap();
    writeln!(file, "{} started!", &timestamp).unwrap();

    match tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
    {
        Ok(x) => {
            writeln!(file, "{} ended!", timestamp).unwrap();
            x
        }
        Err(e) => {
            writeln!(file, "{} ERROR: {:?}", timestamp, e).unwrap();
        }
    }
}
