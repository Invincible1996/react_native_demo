package com.react_native_demo.utils;

import android.content.ContentResolver;
import android.content.Context;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by wenqiang on 2017/10/23.
 */

public class FileManager {
    private static FileManager mInstance;
    private static Context mContext;
    public static ContentResolver mContentResolver;
    private static Object mLock = new Object();

    public static FileManager getmInstance(Context context) {
        if (mInstance == null) {
            synchronized (mLock) {
                if (mInstance == null) {
                    mInstance = new FileManager();
                    mContext = context;
                    mContentResolver = context.getContentResolver();
                }
            }
        }
        return mInstance;
    }

    /**
     * 通过图片文件夹的路径获取该目录下的图片
     */
    public List<String> getImgListByDir(String dir) {
        ArrayList<String> imgPaths = new ArrayList<>();
        File directory = new File(dir);
        if (directory == null || !directory.exists()) {
            return imgPaths;
        }
        File[] files = directory.listFiles();
        for (File file : files) {
            String path = file.getAbsolutePath();
            if (FileUtils.isPicFile(path)) {
                imgPaths.add(path);
            }
        }
        return imgPaths;
    }
}
