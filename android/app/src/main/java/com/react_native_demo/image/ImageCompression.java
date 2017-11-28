package com.react_native_demo.image;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.AttributeSet;

/**
 * Created by wenqiang on 2017/11/24.
 */

public class ImageCompression {
    private static ImageCompression mInstance;

    private ImageCompression() {}

    public static ImageCompression getInstance() {
        if (mInstance == null) {
            synchronized (ImageCompression.class) {
                if (mInstance == null) {
                    mInstance = new ImageCompression();
                }
            }
        }
        return mInstance;
    }



    public Bitmap compressionImage(String path, int width, int height) {

        BitmapFactory.Options options = new BitmapFactory.Options();
        options.inJustDecodeBounds = true;
        BitmapFactory.decodeFile(path, options);

        options.inSampleSize = caculateInSimpleSize(options, width, height);

        //使用获取到的inSampleSize再次解析图片

        options.inJustDecodeBounds = false;

        Bitmap bitmap = BitmapFactory.decodeFile(path,options);

        return bitmap;
    }

    /**
     * 根据需求的宽和高以及图片的实际宽和高计算SampleSize
     *
     * @param options
     * @param width
     * @param height
     * @return
     */
    private int caculateInSimpleSize(BitmapFactory.Options options, int reqWidth, int reqHeight) {

        int width = options.outWidth;
        int height = options.outHeight;

        int inSampleSize = 1;

        if (width > reqWidth || height > reqHeight) {

            int widthRadio = Math.round(width * 1.0f / reqWidth);
            int heightRadio = Math.round(height * 1.0f / reqHeight);

            inSampleSize = Math.max(widthRadio,heightRadio);
        }

        return inSampleSize;
    }

}