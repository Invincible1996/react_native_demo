package com.react_native_demo;

import android.content.Context;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;

/**
 * Created by wenqiang on 2017/11/4.
 */

public class ReactTestModule extends ReactContextBaseJavaModule {

    private Context mContext;

    Object[] arr = {"123", "345", "678"};

    public ReactTestModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "ReactTest";
    }

    @ReactMethod
    public void getResult(final Callback callback) {
        new Thread(new Runnable() {
            @Override
            public void run() {
                callback.invoke(arr);
            }
        }).start();
    }



    @ReactMethod
    public void tryPromise(Promise promise) {
        WritableMap map = Arguments.createMap();
        map.putString("aaaa", "相见难，别亦难");
        promise.resolve("喜欢你，那双眼动人，笑声更迷人");
    }
}