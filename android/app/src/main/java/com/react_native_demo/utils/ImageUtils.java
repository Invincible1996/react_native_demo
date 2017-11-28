package com.react_native_demo.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Environment;
import android.os.SystemClock;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by wenqiang on 2017/11/25.
 */

public class ImageUtils {
    String absolutePath;
    private static ImageUtils mInstance;

    private ImageUtils() {
    }

    public static ImageUtils getInstance() {
        if (mInstance == null) {
            synchronized (ImageUtils.class) {
                if (mInstance == null) {
                    mInstance = new ImageUtils();
                }
            }
        }

        return mInstance;
    }

    public String getImage(int w, int h, String path) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;//获取图片的宽和高，并不把图片加载道内存中
        BitmapFactory.decodeFile(path, options);

        int outWidth = options.outWidth;
        int outHeight = options.outHeight;
        options.inSampleSize = 1;

        if (outWidth > w || outHeight > h) {
            int widthRation = Math.round(outWidth * 1.0f / w);
            int heightRation = Math.round(outHeight * 1.0f / h);
            options.inSampleSize = Math.max(widthRation, heightRation);
        }
        options.inJustDecodeBounds = false;//使用simpleSize再次解析图片,把图片加载到内存

        Bitmap bitmap = BitmapFactory.decodeFile(path, options);

        File externalStorageDirectory = Environment.getExternalStorageDirectory();
        File file = new File(externalStorageDirectory, System.currentTimeMillis() + ".jpg");
        try {
            BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
            bitmap.compress(Bitmap.CompressFormat.JPEG, 90, bos);
            bos.flush();
            bos.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (file.exists()) {
            absolutePath = file.getAbsolutePath();
        }

        return absolutePath;
    }


}