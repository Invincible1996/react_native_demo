package com.react_native_demo.photopicker;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;
import com.react_native_demo.MainActivity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wenqiang on 2017/11/10.
 */

public class PickerModule extends ReactContextBaseJavaModule {

    private Promise mPromise;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private Context mContext;
    private List<String> list = new ArrayList<>();

    public PickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;

        reactContext.addActivityEventListener(new BaseActivityEventListener() {

            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == MainActivity.REQUEST_CODE) {
                    if (resultCode == Activity.RESULT_OK) {
                        List<String> mImgs = data.getStringArrayListExtra("mImgs");

                        Log.d("mImgs", mImgs.size() + "---");

                        list.clear();
                        for (int i = 0; i < mImgs.size(); i++) {
                            String path = mImgs.get(i).substring(5);
                            list.add(path);
                        }

                        Log.d("list", list.size() + "");

                        String json = JSON.toJSONString(list);

                        Log.d("json", "onActivityResult: " + json);

                        mPromise.resolve(json);
                    }
                }
            }
        });
    }

    @Override
    public String getName() {
        return "PickerModule";
    }

    @ReactMethod
    public void openPicker(String json, Promise promise) {
        Activity activity = getCurrentActivity();
        mPromise = promise;

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

//        Log.d("Json From RN", json);

//        List<ImgsBean> bean = JSON.parseArray(json, ImgsBean.class);
//        Log.d("bean",bean.toString());
        Intent intent = new Intent(activity, PhotosActivity.class);

        activity.startActivityForResult(intent, MainActivity.REQUEST_CODE);

    }


}
