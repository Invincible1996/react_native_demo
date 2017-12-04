package com.react_native_demo.photopicker.bean;

import android.database.Cursor;
import android.provider.MediaStore;

/**
 * Created by wenqiang on 2017/12/1.
 */

public class ImageBean {

    private String path;

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    @Override
    public String toString() {
        return "ImageBean{" +
                "path='" + path + '\'' +
                '}';
    }


    public static ImageBean fromCursor(Cursor cursor) {


        ImageBean imageBean = new ImageBean();
//        musicBean.title=cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DISPLAY_NAME));
        imageBean.path = cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.DATA));
//        musicBean.duration=cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.DURATION));
//        musicBean.size=cursor.getLong(cursor.getColumnIndex(MediaStore.Audio.Media.SIZE));
//        musicBean.artist=cursor.getString(cursor.getColumnIndex(MediaStore.Audio.Media.ARTIST));
        return imageBean;
    }
}
