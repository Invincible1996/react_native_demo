package com.react_native_demo.photopicker;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.react_native_demo.MainActivity;

/**
 * Created by wenqiang on 2017/11/10.
 */

public class PickerModule extends ReactContextBaseJavaModule {

    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private Context mContext;

    public PickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "PickerModule";
    }

    @ReactMethod
    public void openPicker(ReadableMap options , Promise promise) {
        Activity activity = getCurrentActivity();
        if (activity == null){
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }
        Intent intent = new Intent(activity, PhotosActivity.class);

        activity.startActivityForResult(intent, MainActivity.REQUEST_CODE);

    }
}
