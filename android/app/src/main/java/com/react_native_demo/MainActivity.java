package com.react_native_demo;

import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.react_native_demo.utils.StatusBarCompat;

import java.util.ArrayList;

import static com.bumptech.glide.gifdecoder.GifHeaderParser.TAG;

public class MainActivity extends ReactActivity {
    public static final int REQUEST_CODE = 2;
    private static final String TAG = "MainActivity";

    @Override
    protected String getMainComponentName() {
        return "react_native_demo";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        StatusBarCompat.compat(this, Color.parseColor("#313237"));
    }



}
