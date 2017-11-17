package com.react_native_demo.utils;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

/**
 * Created by wenqiang on 2017/10/26.
 */

public class ImageUtil {

    private static ImageUtil mInstance;

    public static ImageUtil getInstance() {
        if (mInstance == null) {
            synchronized (ImageUtil.class) {
                if (mInstance == null) {
                    mInstance = new ImageUtil();
                }
            }
        }
        return mInstance;
    }

    //压缩图片尺寸
    public Bitmap compressBySize(String pathName) {

        BitmapFactory.Options opts = new BitmapFactory.Options();
        opts.inJustDecodeBounds = true;// 不去真的解析图片，只是获取图片的头部信息，包含宽高等；
        Bitmap bitmap = BitmapFactory.decodeFile(pathName, opts);
        // 得到图片的宽度、高度；
        float imgWidth = opts.outWidth;
        float imgHeight = opts.outHeight;
        // 分别计算图片宽度、高度与目标宽度、高度的比例；取大于等于该比例的最小整数；
        int widthRatio = (int) Math.ceil(imgWidth / (float) 300);
        int heightRatio = (int) Math.ceil(imgHeight / (float) 300);
        opts.inSampleSize = 1;
        if (widthRatio > 1 || widthRatio > 1) {
            if (widthRatio > heightRatio) {
                opts.inSampleSize = widthRatio;
            } else {
                opts.inSampleSize = heightRatio;
            }
        }
        //设置好缩放比例后，加载图片进内容；
        opts.inJustDecodeBounds = false;
        bitmap = BitmapFactory.decodeFile(pathName, opts);
        return bitmap;
    }

    //存储进SD卡
    public static void saveFile(Bitmap bm, String fileName) throws Exception {
//        File dirFile = new File(fileName);
//        //检测图片是否存在
//        if (dirFile.exists()) {
//            dirFile.delete();  //删除原图片
//        }
        File myCaptureFile = new File(fileName);
        BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(myCaptureFile));
        //100表示不进行压缩，70表示压缩率为30%
        bm.compress(Bitmap.CompressFormat.JPEG, 100, bos);
        bos.flush();
        bos.close();
    }
}
