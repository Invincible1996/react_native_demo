package com.react_native_demo.photopicker;

import android.content.AsyncQueryHandler;
import android.content.ContentResolver;
import android.database.Cursor;
import android.util.Log;
import com.react_native_demo.photopicker.adapter.PhotosAdapter;

/**
 * Created by wenqiang on 2017/12/1.
 */

public class PhotosQueryHandler extends AsyncQueryHandler {


    public PhotosQueryHandler(ContentResolver cr) {
        super(cr);
    }

    @Override
    protected void onQueryComplete(int token, Object cookie, Cursor cursor) {
        super.onQueryComplete(token, cookie, cursor);

        if (token == 0 && cookie instanceof PhotosAdapter) {
            PhotosAdapter cursorAdapter = (PhotosAdapter) cookie;
            Log.d("cursor",cursor.);
            cursorAdapter.changeCursor(cursor);
        }

    }
}
