package com.react_native_demo.photopicker;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Environment;
import android.util.Log;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.react_native_demo.MainActivity;
import com.react_native_demo.photopicker.constant.Const;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wenqiang on 2017/11/10.
 */

public class PickerModule extends ReactContextBaseJavaModule {

    private int width;
    private int height;

    private Promise mPromise;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";

    private Context mContext;
    private List<String> list = new ArrayList<>();
    private Activity mActivity;

    public PickerModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;

        reactContext.addActivityEventListener(new BaseActivityEventListener() {

            @Override
            public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
                if (requestCode == MainActivity.REQUEST_CODE) {
                    if (resultCode == Activity.RESULT_OK) {
                        //相册选择页面返回的数据
                        List<String> mImgs = data.getStringArrayListExtra("mImgs");

                        //压缩图片
//                        Bitmap bitmap = ImageCompression.getInstance().compressionImage(mImgs.get(0), width, height);
//                        list.clear();
//                        for (int i = 0; i < mImgs.size(); i++) {
//                            String image = ImageUtils.getInstance().getImage(100, 100, mImgs.get(i));
//                            list.add(image);
//                        }

                        String json = JSON.toJSONString(mImgs);
                        mPromise.resolve(json);
                    }
                }
            }
        });
    }


    /**
     * 压缩图片
     */
    private void compressionImage(String path) {

        FileInputStream is = null;
        try {
            is = new FileInputStream(path);
            File compressFile = new File(Environment.getExternalStorageDirectory(), ".jpg");


        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    @Override
    public String getName() {
        return "PickerModule";
    }

    @ReactMethod
    public void openPicker(String json, Promise promise) {
        List<String> mList = new ArrayList<>();
        mActivity = getCurrentActivity();
        mPromise = promise;

        if (mActivity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

//        Log.d("Json From RN", json.length() + " ");

        try {
            JSONArray array = JSON.parseArray(json);
            Log.d("array", array.get(0).toString());
            for (int i = 0; i < array.size(); i++) {
                mList.add(array.get(i).toString());
            }

            Log.d("mList", mList.size() + "");

        } catch (Exception e) {

        }


        Intent intent = new Intent(mActivity, PhotosActivity.class);
        intent.putStringArrayListExtra(Const.LIST_FROM_RN, (ArrayList<String>) mList);
        mActivity.startActivityForResult(intent, MainActivity.REQUEST_CODE);

    }

    @ReactMethod
    public void goToBigImage(String json, int index) {
        List<String> mList = new ArrayList<>();
        try {
            JSONArray array = JSON.parseArray(json);
            Log.d("array", array.get(0).toString());
            for (int i = 0; i < array.size(); i++) {
                mList.add(array.get(i).toString());
            }

            Log.d("mList", mList.size() + "");

        } catch (Exception e) {

        }
        Intent intent = new Intent(mActivity, BigImageActivity.class);
        intent.putStringArrayListExtra(Const.LIST_FROM_RN, (ArrayList<String>) mList);
        intent.putExtra(Const.FIRSTR_INDEX, index);
        mActivity.startActivity(intent);
    }


}
